import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * API Route for On-Demand Revalidation
 * Called by Admin Portal when CMS content is updated
 *
 * Usage: POST /api/revalidate
 * Body: { type: 'announcements' | 'navigation' | 'content-pages' | 'quick-links' | 'all', path?: string }
 * Headers: x-revalidate-secret: <REVALIDATE_SECRET>
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.headers.get("x-revalidate-secret");
    const expectedSecret =
      process.env.REVALIDATE_SECRET || "census-revalidate-secret-2026";

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: "Invalid revalidation secret" },
        { status: 401 },
      );
    }

    // Parse request body
    const body = await request.json();
    const { type, path } = body;

    console.log("[Revalidate] Request received:", { type, path });

    // Revalidate based on type
    switch (type) {
      case "announcements":
        revalidatePath("/", "page"); // Homepage shows announcements
        console.log("[Revalidate] Revalidated: announcements");
        break;

      case "navigation":
        revalidatePath("/", "layout"); // Revalidate layout (navbar)
        console.log("[Revalidate] Revalidated: navigation");
        break;

      case "content-pages":
        if (path) {
          revalidatePath(path, "page");
          console.log("[Revalidate] Revalidated: content page", path);
        } else {
          revalidatePath("/", "layout"); // Revalidate all pages
        }
        break;

      case "quick-links":
        revalidatePath("/", "page"); // Homepage may show quick links
        console.log("[Revalidate] Revalidated: quick-links");
        break;

      case "media-library":
        revalidatePath("/", "layout"); // Media can be anywhere
        console.log("[Revalidate] Revalidated: media-library");
        break;

      case "all":
        // Revalidate everything
        revalidatePath("/", "layout");
        revalidatePath("/", "page");
        console.log("[Revalidate] Revalidated: ALL");
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid revalidation type" },
          { status: 400 },
        );
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated: ${type}`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Revalidation failed",
      },
      { status: 500 },
    );
  }
}

// GET request for testing
export async function GET() {
  return NextResponse.json({
    message: "Revalidation endpoint is active",
    usage: "POST with { type, path } and x-revalidate-secret header",
    types: [
      "announcements",
      "navigation",
      "content-pages",
      "quick-links",
      "media-library",
      "all",
    ],
  });
}
