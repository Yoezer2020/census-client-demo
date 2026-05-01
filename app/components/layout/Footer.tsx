import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/logos/left.png"
                alt="Government Logo"
                width={40}
                height={40}
                className="h-8 w-auto grayscale opacity-70"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">
                BCRS Portal
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The official digital service portal of the Department of Civil
              Registration & Census. We are committed to providing transparent,
              efficient, and accessible services to all residents and citizens
              of Bhutan.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-8 opacity-40">
              /SITEMAP
            </h2>
            <div className="grid grid-cols-2 gap-10 md:gap-12">
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-6">
                  Services
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/guide"
                      className="text-[10px] sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Digital Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://citizenservices.gov.bt"
                      className="text-[10px] sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Apply Online
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/offices"
                      className="text-[10px] sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Regional Offices
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[10px] sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Support Center
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-6">
                  Connect
                </h3>
                <ul className="space-y-4">
                  <li className="flex flex-row justify-between items-center sm:flex-col sm:items-start gap-2">
                    <span className="text-[10px] sm:text-[10px] font-semibold text-muted-foreground uppercase shrink-0">
                      Inquiries
                    </span>
                    <span className="text-[10px] sm:text-sm text-foreground font-medium text-right sm:text-left">
                      +975-2-333333
                    </span>
                  </li>
                  <li className="flex flex-row justify-between items-center sm:flex-col sm:items-start gap-2">
                    <span className="text-[10px] sm:text-[10px] font-bold text-muted-foreground uppercase shrink-0">
                      Email
                    </span>
                    <span className="text-[10px] sm:text-sm text-foreground font-medium text-right sm:text-left truncate max-w-[100px] sm:max-w-none">
                      info@census.gov.bt
                    </span>
                  </li>
                  <li className="flex flex-row justify-between items-center sm:flex-col sm:items-start gap-2">
                    <span className="text-[10px] sm:text-[10px] font-semibold text-muted-foreground uppercase shrink-0">
                      Location
                    </span>
                    <span className="text-[10px] sm:text-sm text-foreground font-medium text-right sm:text-left">
                      Thimphu, BT
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Department of Civil Registration &
            Census, Royal Government of Bhutan.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
