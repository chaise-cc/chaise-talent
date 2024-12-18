import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chaise - Africa Leading Freelance Space",
    short_name: "Chaise",
    description: "Top Talents and global opportunities made seamless",
    start_url: "/",
    display: "standalone",
    background_color: "#1E283A",
    theme_color: "#1E283A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/ico",
      },
      {
        src: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
