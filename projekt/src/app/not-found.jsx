import Link from "next/link";
import SiteHeader from "@/components/siteHeader";
import SiteFooter from "@/components/siteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="not-found">
          <div className="not-found__container">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__subtitle">Page Not Found</h2>
            <p className="not-found__description">
              Sorry, the page you're looking for doesn't exist or may be under
              construction. Please check back later.
            </p>
            <div className="not-found__actions">
              <Link
                href="/"
                className="not-found__button not-found__button--primary"
              >
                Go to listings
              </Link>
              <Link
                href="/contact"
                className="not-found__button not-found__button--secondary"
              >
                Stay up to date!
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
