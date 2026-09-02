import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lelite-multispeciality-dental-clinic-web-client.vercel.app/sitemap.xml",
  };
}
