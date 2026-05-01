/**
 * NavbarServer — Server Component
 *
 * Fetches navigation items from the CMS (Common Service) at request time.
 * The /cm-navigation/all endpoint already returns contentPages embedded
 * inside each navigation item via the TypeORM relation, so we use that
 * directly — no second fetch needed.
 *
 * Mapping rules:
 *   • status !== "active"  →  item is skipped
 *   • contentPages with status === "published" become sub-menu entries
 *     linked as  /pages/<slug>
 *   • If url is blank and there are sub-pages, href defaults to "#"
 *   • If CMS is unreachable or returns nothing, Navbar falls back to
 *     the built-in STATIC_NAV_ITEMS
 */

import Navbar, { NavItem } from "./Navbar";
import { NavigationItem, getActiveNavigation } from "@/lib/services/cmsService";

// ── Static items that are ALWAYS prepended (not CMS-controlled) ────────────
const STATIC_PREFIX: NavItem[] = [{ name: "Home", href: "/" }];

// ── Build NavItem[] from CMS data ─────────────────────────────────────────
function buildNavItems(cmsNav: NavigationItem[]): NavItem[] {
  const dynamic: NavItem[] = cmsNav
    .filter((nav) => nav.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((nav) => {
      // Use ALL content pages embedded in the response (draft & published)
      // The admin explicitly added them as sub-links under this nav item.
      // "published" controls whether the page body is publicly readable,
      // but the nav entry should always be visible once created.
      const subPages = (nav.contentPages ?? []).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );

      const href = nav.url?.trim() || (subPages.length > 0 ? "#" : "/");

      if (subPages.length === 0) {
        return { name: nav.label, href };
      }

      return {
        name: nav.label,
        href,
        submenu: subPages.map((page) => ({
          name: page.title,
          href: `/pages/${page.slug}`,
        })),
      };
    });

  return [...STATIC_PREFIX, ...dynamic];
}

// ── Server Component ───────────────────────────────────────────────────────
export default async function NavbarServer() {
  let navItems: NavItem[] | undefined;

  try {
    const cmsNav = await getActiveNavigation();
    if (cmsNav.length > 0) {
      navItems = buildNavItems(cmsNav);
    }
  } catch (err) {
    console.error("[NavbarServer] Failed to fetch CMS navigation:", err);
  }

  // undefined → Navbar uses its own STATIC_NAV_ITEMS fallback
  return <Navbar navItems={navItems} />;
}
