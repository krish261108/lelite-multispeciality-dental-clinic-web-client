import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lelite-multispeciality-dental-clinic-web-client.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "L'ELITE Multispeciality Digital Dental Care | Puducherry",
  description: "Modern, gentle and patient-first dental care in the heart of Puducherry.",
  applicationName: "L'ELITE Dental Care",
  keywords: ["dentist Puducherry", "dental clinic Puducherry", "teeth cleaning", "orthodontics", "root canal", "L'ELITE dental"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "L'ELITE Multispeciality Digital Dental Care",
    description: "Calm, contemporary dental care in Puducherry.",
    url: siteUrl,
    siteName: "L'ELITE Dental Care",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'ELITE Dental Care | Puducherry",
    description: "Modern, gentle and patient-first dental care.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
