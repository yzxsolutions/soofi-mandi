import type { Metadata } from "next";
import { Katibeh, Poppins } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

const katibeh = Katibeh({
  subsets: ["latin", "arabic"],
  weight: ["400"],
  variable: "--font-katibeh",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Soofi Mandi - Authentic Arabian Flavors",
    template: "%s | Soofi Mandi",
  },
  description:
    "Experience authentic Arabian cuisine with traditional Mandi, rice dishes, and Middle Eastern specialties. Order online for delivery and taste the flavors of tradition.",
  keywords: [
    "Arabian food",
    "Mandi",
    "Middle Eastern cuisine",
    "food delivery",
    "authentic",
    "traditional",
  ],
  authors: [{ name: "Soofi Mandi Restaurant" }],
  creator: "Soofi Mandi",
  publisher: "Soofi Mandi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://soofimandi.com"),
  openGraph: {
    title: "Soofi Mandi - Authentic Arabian Flavors",
    description:
      "Experience authentic Arabian cuisine with traditional Mandi and Middle Eastern specialties.",
    url: "https://soofimandi.com",
    siteName: "Soofi Mandi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soofi Mandi - Authentic Arabian Flavors",
    description:
      "Experience authentic Arabian cuisine with traditional Mandi and Middle Eastern specialties.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#CC7A00" />
      </head>
      <body className={`${katibeh.variable} ${poppins.variable} antialiased`}>
        <AppLayout>
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
        </AppLayout>
      </body>
    </html>
  );
}
