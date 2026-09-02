import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "L'ELITE Multispeciality Digital Dental Care | Puducherry",
  description: "Modern, gentle and patient-first dental care in the heart of Puducherry.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
