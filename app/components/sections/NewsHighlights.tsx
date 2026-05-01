"use client";

import { useEffect, useRef, useState } from "react";
import {
  getActiveAnnouncements,
  type Announcement,
} from "@/lib/services/cmsService";
import { useSessionContext } from "@/app/context/SessionContext";

export default function NewsHighlights() {
  const { session } = useSessionContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Log session data
  console.log("NewsHighlights - Session:", {
    userName: session?.user?.name,
    userEmail: session?.user?.email,
  });

  useEffect(() => {
    // Fetch announcements from CMS
    async function fetchAnnouncements() {
      try {
        const data = await getActiveAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let isPaused = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          const itemWidth = scrollContainer.firstElementChild?.clientWidth || 0;
          const gap = 32; // 8 * 4 = 32px (sm:gap-8)
          const scrollAmount = itemWidth + gap;
          const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;

          if (scrollContainer.scrollLeft >= maxScroll - 10) {
            // Reset to start smoothly
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll to next item
            scrollContainer.scrollBy({
              left: scrollAmount,
              behavior: "smooth",
            });
          }
        }
      }, 4000); // Change slide every 4 seconds
    };

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [announcements]);

  if (loading) {
    return (
      <div className="flex overflow-x-auto gap-6 sm:gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] border border-border min-w-full md:min-w-[calc(50%-1rem)] flex-shrink-0"
          >
            <div className="bg-muted h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No announcements available at the moment.
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] shadow-sm border border-border min-w-full md:min-w-[calc(50%-1rem)] snap-start flex-shrink-0"
        >
          {announcement.image_url ? (
            <img
              src={announcement.image_url}
              alt={announcement.headline}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1 sm:mb-2 block">
              {announcement.category?.name || "Announcement"}
            </span>
            <h3 className="text-white sm:text-lg md:text-xl font-bold">
              {announcement.headline}
            </h3>
            {announcement.message && (
              <div
                className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: announcement.message.replace(/<[^>]*>/g, ""), // Strip HTML tags for preview
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
