import type { MetadataRoute } from "next";

const siteUrl = "https://lelite-multispeciality-dental-clinic-web-client.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }];
}
