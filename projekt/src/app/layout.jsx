import { Inter } from "next/font/google";
import "@/styles/main.scss";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: "%s | SwapHub",
    default: "SwapHub",
  },
  description: "SwapHub - find og byt brugte ting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='da'>
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
