import SiteHeader from "@/components/siteHeader";
import SiteFooter from "@/components/siteFooter";

export default function HeaderFooter({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
