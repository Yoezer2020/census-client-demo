import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getContentPageBySlug } from "@/lib/services/cmsService";

/**
 * Strip markdown code fences that the rich-text editor sometimes wraps
 * around pasted HTML.  e.g.  ```html\n<p>…</p>\n```  → <p>…</p>
 * Also decode HTML entities that get double-encoded inside <code> blocks.
 */
function extractHtml(raw: string | undefined): string {
  if (!raw) return "";

  // Remove markdown fences:  ```html … ```  or  ``` … ```
  const fenceMatch = raw.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fenceMatch) return wrapPlainText(fenceMatch[1].trim());

  // If the body is a bare <pre><code>…</code></pre> wrapper, decode the inner text
  const codeMatch = raw.match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  if (codeMatch) {
    const decoded = codeMatch[1]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    return wrapPlainText(decoded);
  }

  return raw;
}

/**
 * If the string contains no HTML tags at all (plain text from the CMS),
 * split on blank lines and wrap each paragraph in <p> tags so it renders
 * visibly instead of collapsing into a single unstyled line.
 */
function wrapPlainText(text: string): string {
  // Already contains HTML tags — return as-is
  if (/<[a-z][\s\S]*?>/i.test(text)) return text;

  // Convert plain text paragraphs (blank-line separated) to <p> blocks
  return text
    .split(/\n{2,}/)
    .map((para) => `<p>${para.replace(/\n/g, "<br/>").trim()}</p>`)
    .filter((p) => p !== "<p></p>")
    .join("\n");
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getContentPageBySlug(slug);
  if (!page) return { title: "Page Not Found" };
  return {
    title: `${page.title} | Census Office`,
    description: extractHtml(page.body)
      .replace(/<[^>]*>/g, "")
      .substring(0, 160),
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getContentPageBySlug(slug);

  if (!page) notFound();

  const body = extractHtml(page.body);

  // Build a fully-qualified image URL.
  // The API may return a relative file_path (e.g. "uploads/foo.jpg") when
  // no explicit url is set.  next/image requires an absolute URL, so we
  // prefix it with the Common Service base URL when needed.
  const COMMON_SERVICE_URL =
    process.env.NEXT_PUBLIC_COMMON_SERVICE_URL ||
    process.env.COMMON_SERVICE_URL ||
    "http://localhost:5003";

  function resolveImageSrc(
    img: { url?: string; file_path?: string } | undefined | null,
  ): string | null {
    if (!img) return null;
    const raw = img.url || img.file_path || "";
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw; // already absolute
    if (raw.startsWith("/")) return `${COMMON_SERVICE_URL}${raw}`;
    return `${COMMON_SERVICE_URL}/${raw}`; // relative path
  }

  const featuredImageSrc = resolveImageSrc(page.featuredImage);
  const updatedDate = page.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
        {page.navigation && (
          <>
            <span className="text-gray-500">{page.navigation.label}</span>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          </>
        )}
        <span className="text-gray-900 font-medium">{page.title}</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {featuredImageSrc && (
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image
              src={featuredImageSrc}
              alt={page.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
            {page.title}
          </h1>
          {updatedDate && (
            <p className="mt-3 text-sm text-gray-500">
              Last updated: <time dateTime={page.updatedAt}>{updatedDate}</time>
            </p>
          )}
        </header>

        {/* Body — rendered from rich-text HTML */}
        <article
          className="cms-content text-gray-700 leading-relaxed space-y-4
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
            [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline
            [&_strong]:font-semibold [&_strong]:text-gray-900
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
            [&_li]:text-gray-700
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
            [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full
            [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
            [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-left [&_th]:p-3 [&_th]:border [&_th]:border-gray-200
            [&_td]:p-3 [&_td]:border [&_td]:border-gray-200 [&_td]:text-gray-700
            [&_hr]:border-gray-200 [&_hr]:my-6"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
}
