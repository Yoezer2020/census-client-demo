"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { Menu, X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ASSETS } from "@/lib/constants/assets";
import { useSessionContext } from "@/app/context/SessionContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Types ──────────────────────────────────────────────────────────────────
export interface NestedNavItem {
  name: string;
  href: string;
}

export interface SubNavItem {
  name: string;
  href: string;
  nested?: NestedNavItem[];
}

export interface NavItem {
  name: string;
  href: string;
  submenu?: SubNavItem[];
}

// ── Static fallback nav (used when CMS is unreachable) ────────────────────
const STATIC_NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    submenu: [
      { name: "Background", href: "/about#background" },
      { name: "Vision & Mission", href: "/about#vision" },
      { name: "Core Functions", href: "/about#functions" },
      { name: "Way Forward", href: "/about#future" },
      { name: "Organogram", href: "/about#organogram" },
    ],
  },
  {
    name: "Divisions",
    href: "/divisions",
    submenu: [
      { name: "Demography & Info (DID)", href: "/divisions#did" },
      { name: "Citizen Service (CSD)", href: "/divisions#csd" },
      { name: "Registration & Investigation (CRID)", href: "/divisions#crid" },
    ],
  },
  {
    name: "Who Is Who",
    href: "/leadership",
    submenu: [
      { name: "Office of Director", href: "/leadership#commissioner" },
      { name: "Demography & Info (DID)", href: "/leadership#did" },
      { name: "Citizen Service (CSD)", href: "/leadership#csd" },
      { name: "Registration & Investigation (CRID)", href: "/leadership#crid" },
    ],
  },
  { name: "Regional Offices", href: "/offices" },
  {
    name: "Application Guide",
    href: "/guide",
    submenu: [
      {
        name: "New CID/SR Card",
        href: "/guide#cid",
        nested: [
          { name: "Aged 15-17 years", href: "/guide/cid-minor" },
          { name: "Aged 18 years and above", href: "/guide/cid-adult" },
        ],
      },
      { name: "Move in & Move out", href: "/guide#move" },
      {
        name: "Birth Registration",
        href: "/guide#birth",
        nested: [
          {
            name: "From the current place of residence",
            href: "/guide#birth-current",
          },
          {
            name: "From the permanent address as per civil registration and census record",
            href: "/guide#birth-permanent",
          },
        ],
      },
      {
        name: "Death Registration",
        href: "/guide#death",
        nested: [
          {
            name: "From the current place of residence",
            href: "/guide#death-current",
          },
          {
            name: "From the permanent address as per civil registration and census record",
            href: "/guide#death-permanent",
          },
        ],
      },
    ],
  },
];

export default function Navbar({
  navItems = STATIC_NAV_ITEMS,
}: {
  navItems?: NavItem[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null);
  const { isAuthenticated } = useSessionContext();

  const { logout } = useSessionContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 subtle-elevation">
      {/* Top Bar: Official Branding */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/assets/logos/left.png"
                alt="Government Logo"
                width={100}
                height={100}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain mix-blend-multiply"
              />
            </div>

            {/* Center Branding Content */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0">
              <div className="w-full max-w-[200px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] mb-2 sm:mb-3 md:mb-4">
                <Image
                  src={ASSETS.images.headerText}
                  alt="Bhutan Government Dzongkha Branding"
                  width={700}
                  height={50}
                  priority
                  className="w-full h-auto object-contain"
                  style={{ transform: "scaleY(1)" }}
                />
              </div>

              <div className="space-y-0.5">
                <h1 className="text-[9px] sm:text-xs md:text-sm font-bold text-foreground uppercase tracking-wider leading-tight">
                  Royal Government of Bhutan
                </h1>
                <h2 className="text-[8px] sm:text-[10px] md:text-xs font-medium text-primary leading-tight">
                  Ministry of Home Affairs
                </h2>
                <h3 className="text-[7px] sm:text-[9px] md:text-xs font-medium text-muted-foreground leading-tight">
                  Department of Civil Registration & Census
                </h3>
              </div>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0">
              <Image
                src={ASSETS.logos.right}
                alt="BCRS Logo"
                width={90}
                height={90}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Primary Navigation */}
      <div className="bg-white/70 backdrop-blur-lg backdrop-saturate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:justify-center h-12 items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 h-full">
              {navItems.map((item) => (
                <Fragment key={item.name}>
                  <div className="relative group h-full flex items-center">
                    <Link
                      href={item.href}
                      className="inline-flex items-center px-4 py-2 text-[14px] font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-muted"
                    >
                      {item.name}
                      {item.submenu && (
                        <ChevronDown className="ml-1.5 h-3.5 w-3.5 opacity-40 group-hover:rotate-180 transition-transform" />
                      )}
                    </Link>
                    {/* Desktop Submenu */}
                    {item.submenu && (
                      <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="w-72 rounded-lg bg-white border border-border medium-elevation p-1.5">
                          <div className="grid gap-0.5">
                            {item.submenu.map((sub: any) => (
                              <div
                                key={sub.name}
                                className="relative group/nested"
                              >
                                <Link
                                  href={sub.href}
                                  className="flex items-center justify-between px-3 py-2.5 text-[13.5px] font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-md transition-colors"
                                >
                                  <span className="flex-1">{sub.name}</span>
                                  {sub.nested && (
                                    <ChevronRight className="h-3.5 w-3.5 ml-2 opacity-30 group-hover/nested:translate-x-0.5 transition-transform" />
                                  )}
                                </Link>
                                {sub.nested && (
                                  <div className="hidden group-hover/nested:block pl-4 mt-0.5 mb-1.5 space-y-0.5 border-l border-border ml-3">
                                    {sub.nested.map((nested: any) => (
                                      <Link
                                        key={nested.name}
                                        href={nested.href}
                                        className="block px-3 py-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-primary transition-colors"
                                      >
                                        {nested.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dashboard Link - Only show when authenticated, placed after Home */}
                  {item.name === "Home" && isAuthenticated && (
                    <Fragment key="dashboard-link">
                      <div className="relative h-full flex items-center">
                        <Link
                          href="/dashboard"
                          className="inline-flex items-center px-4 py-2 text-[14px] font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-muted"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              ))}

              {/* Logout Button - Only show when authenticated */}
              {isAuthenticated && (
                <div className="relative h-full flex items-center ml-2">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-red-600 hover:text-red-700 transition-colors rounded-md hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center w-full justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-2 rounded-md text-foreground/70 hover:bg-muted transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Fragment key={item.name}>
                <button
                  onClick={() =>
                    item.submenu &&
                    setActiveSubmenu(
                      activeSubmenu === item.name ? null : item.name,
                    )
                  }
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  <Link
                    href={item.href}
                    onClick={() => !item.submenu && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeSubmenu === item.name && "rotate-180",
                      )}
                    />
                  )}
                </button>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="pl-6 space-y-1">
                    {item.submenu.map((sub: any) => (
                      <div key={sub.name}>
                        <button
                          onClick={() =>
                            sub.nested &&
                            setActiveNestedMenu(
                              activeNestedMenu === sub.name ? null : sub.name,
                            )
                          }
                          className="w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary"
                        >
                          <Link
                            href={sub.href}
                            onClick={() => !sub.nested && setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                          {sub.nested && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform text-gray-400",
                                activeNestedMenu === sub.name && "rotate-180",
                              )}
                            />
                          )}
                        </button>
                        {sub.nested && activeNestedMenu === sub.name && (
                          <div className="pl-6 space-y-1 border-l border-gray-100 ml-3">
                            {sub.nested.map((nested: any) => (
                              <Link
                                key={nested.name}
                                href={nested.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:text-primary"
                              >
                                {nested.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Dashboard Link - Mobile, placed after Home */}
                {item.name === "Home" && isAuthenticated && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                )}
              </Fragment>
            ))}

            {/* Logout Button - Mobile */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
