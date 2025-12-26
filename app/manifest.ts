import {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mung's COOL",
    short_name: "멍스쿨 | MungSchool",
    start_url: "/",
    display: "standalone",
    background_color: "#e8f4ff",
    theme_color: "#3b82f6",
    description: "반려견 훈련 서비스",
    screenshots: [
      {
        src: "/logos/logo_png.png",
        sizes: "1280x720",
        form_factor: "wide",
      },
    ],
    icons: [
      {
        src: "/pwa-logos/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/pwa-logos/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
