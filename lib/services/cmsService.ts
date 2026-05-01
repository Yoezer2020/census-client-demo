/**
 * CMS Service - Demo version using dummy data
 * Handles announcements, navigation, pages, quick links, etc.
 * All API calls replaced with dummy data for offline demo
 */

import {
  DUMMY_ANNOUNCEMENTS,
  DUMMY_NAVIGATION,
  DUMMY_QUICK_LINKS,
  DUMMY_QUICK_LINK_CATEGORIES,
  DUMMY_CONTENT_PAGES,
  simulateApiDelay,
} from "@/lib/dummy-data";

const COMMON_SERVICE_URL =
  process.env.COMMON_SERVICE_URL ||
  process.env.NEXT_PUBLIC_COMMON_SERVICE_URL ||
  "http://localhost:5003";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Announcement {
  id: string;
  headline: string;
  message?: string;
  image_url?: string;
  image_name?: string;
  category_id?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  status: "active" | "inactive";
  created_by_id?: string;
  created_by_name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AnnouncementCategory {
  id: string;
  name: string;
  name_dzo?: string;
  description?: string;
  slug: string;
  is_active: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsPage {
  id: string;
  cms_navigation_id?: string;
  slug: string;
  title: string;
  body?: string;
  featured_image_id?: string;
  status: "draft" | "published";
  updated_by_id?: string;
  updated_by_name?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  navigation?: {
    id: string;
    label: string;
  };
  featuredImage?: MediaItem;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  category: "forms" | "banners" | "media";
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  icon?: string;
  order?: number;
  message?: string;
  status: "active" | "inactive";
  created_by_id?: string;
  created_by_name?: string;
  createdAt?: string;
  updatedAt?: string;
  contentPages?: CmsPage[];
}

export interface QuickLinkCategory {
  id: string;
  name: string;
  name_dzo?: string;
  description?: string;
  slug: string;
  is_active: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface QuickLink {
  id: string;
  title: string;
  description?: string;
  url?: string;
  content_page_id?: string;
  contentPage?: CmsPage;
  category_id?: string;
  category?: QuickLinkCategory;
  type: string;
  order: number;
  is_active: boolean;
  opens_in_new_tab: boolean;
  icon?: string;
  created_at: string;
  created_by_name?: string;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Fetch active announcements from CMS (DEMO - returns dummy data)
 */
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  try {
    // Simulate API delay for realistic UX
    await simulateApiDelay(300);

    // Return dummy announcements (already filtered to active)
    return DUMMY_ANNOUNCEMENTS as Announcement[];
  } catch (error) {
    console.error("[getActiveAnnouncements] Error:", error);
    return [];
  }
}

/**
 * Fetch active navigation items with content pages (DEMO - returns dummy data)
 */
export async function getActiveNavigation(): Promise<NavigationItem[]> {
  try {
    // Simulate API delay
    await simulateApiDelay(200);

    // Return dummy navigation (already filtered and sorted)
    return DUMMY_NAVIGATION as NavigationItem[];
  } catch (error) {
    console.error("[getActiveNavigation] Error:", error);
    return [];
  }
}

/**
 * Fetch a content page by slug (DEMO - returns dummy data)
 */
export async function getContentPageBySlug(
  slug: string,
): Promise<CmsPage | null> {
  try {
    // Simulate API delay
    await simulateApiDelay(250);

    // Find page by slug in dummy data
    const page = DUMMY_CONTENT_PAGES.find((p) => p.slug === slug);
    return page ? (page as CmsPage) : null;
  } catch (error) {
    console.error("[getContentPageBySlug] Error:", error);
    return null;
  }
}

/**
 * Fetch all published content pages (DEMO - returns dummy data)
 */
export async function getPublishedContentPages(): Promise<CmsPage[]> {
  try {
    // Simulate API delay
    await simulateApiDelay(250);

    // Return dummy content pages (already filtered to published)
    return DUMMY_CONTENT_PAGES as CmsPage[];
  } catch (error) {
    console.error("[getPublishedContentPages] Error:", error);
    return [];
  }
}

/**
 * Fetch active quick links (DEMO - returns dummy data)
 */
export async function getActiveQuickLinks(
  categoryId?: string,
): Promise<QuickLink[]> {
  try {
    // Simulate API delay
    await simulateApiDelay(200);

    // Filter by category if provided, otherwise return all
    let links = DUMMY_QUICK_LINKS as QuickLink[];
    if (categoryId) {
      links = links.filter((link) => link.category_id === categoryId);
    }

    // Already sorted by order
    return links;
  } catch (error) {
    console.error("[getActiveQuickLinks] Error:", error);
    return [];
  }
}

/**
 * Fetch active quick link categories (DEMO - returns dummy data)
 */
export async function getActiveQuickLinkCategories(): Promise<
  QuickLinkCategory[]
> {
  try {
    // Simulate API delay
    await simulateApiDelay(200);

    // Return dummy categories (already filtered and sorted)
    return DUMMY_QUICK_LINK_CATEGORIES as QuickLinkCategory[];
  } catch (error) {
    console.error("[getActiveQuickLinkCategories] Error:", error);
    return [];
  }
}

/**
 * Fetch active announcement categories
 */
export async function getActiveAnnouncementCategories(): Promise<
  AnnouncementCategory[]
> {
  try {
    const url = `${COMMON_SERVICE_URL}/announcement-categories/all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        revalidate: 300,
        tags: ["announcement-categories"],
      },
    });

    if (!response.ok) {
      console.error(
        "[getActiveAnnouncementCategories] API Error:",
        response.statusText,
      );
      return [];
    }

    const data: AnnouncementCategory[] = await response.json();

    // Filter only active categories and sort by order
    return data
      .filter((cat) => cat.is_active)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("[getActiveAnnouncementCategories] Error:", error);
    return [];
  }
}

/**
 * Fetch media library items
 */
export async function getMediaItems(
  category?: "forms" | "banners" | "media",
): Promise<MediaItem[]> {
  try {
    const url = `${COMMON_SERVICE_URL}/cm-media-library/all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        revalidate: 300,
        tags: ["media-library"],
      },
    });

    if (!response.ok) {
      console.error("[getMediaItems] API Error:", response.statusText);
      return [];
    }

    const data: MediaItem[] = await response.json();

    // Filter by category if specified
    return category ? data.filter((item) => item.category === category) : data;
  } catch (error) {
    console.error("[getMediaItems] Error:", error);
    return [];
  }
}
