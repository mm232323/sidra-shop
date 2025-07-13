import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
// import {DefaultSeo} from 'next-seo'
import "./globals.css";
import "@mantine/core/styles.css";
import CanvasCursor from "@/components/CanvasCursor";
const baloo = Baloo_Bhaijaan_2({
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffa01c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sidra-honey-shop.vercel.app"),
  title: {
    default: "Sidra Honey Shop - Premium Natural Honey Products",
    template: "%s | Sidra Honey Shop"
  },
  description: "Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits. Free delivery across the city.",
  keywords: [
    "honey",
    "natural honey",
    "premium honey",
    "organic honey",
    "pure honey",
    "honey products",
    "health benefits",
    "sustainable honey",
    "local honey",
    "Sidra honey",
    "عسل طبيعي",
    "عسل صافي",
    "منتجات العسل",
    "فوائد العسل الصحية"
  ],
  authors: [{ name: "Sidra Honey Shop" }],
  creator: "Sidra Honey Shop",
  publisher: "Sidra Honey Shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sidra-honey-shop.vercel.app",
    siteName: "Sidra Honey Shop",
    title: "Sidra Honey Shop - Premium Natural Honey Products",
    description: "Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Sidra Honey Shop Logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sidrahoneyshop",
    creator: "@sidrahoneyshop",
    title: "Sidra Honey Shop - Premium Natural Honey Products",
    description: "Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits.",
    images: ["/logo.svg"],
  },
  other: {
    "application-name": "Sidra Honey Shop",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Sidra Honey Shop",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#ffa01c",
    "msapplication-tap-highlight": "no",
    "theme-color": "#ffa01c",
  },
};

import {
  createTheme,
  MantineColorsTuple,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { GetUser } from "@/util/auth-apis";
import SessionProviders from "@/app/SessionProvider";
import { AppProvider } from "./context";
import { userData } from "@/util/types";
import { domAnimation, LazyMotion } from "framer-motion";


const myColor: MantineColorsTuple = [
  "#fff6e1",
  "#ffeccb",
  "#ffd79a",
  "#ffc164",
  "#ffaf37",
  "#ffa31b",
  "#ff9d09",
  "#e38800",
  "#cb7800",
  "#b06700",
];

const theme = createTheme({
  colors: {
    myColor,
  },
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  let user: null | userData;
  if (session?.user) {
    user = await GetUser(session.user?.email as string, true);
  }
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffa01c" />
        <meta name="msapplication-TileColor" content="#ffa01c" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sidra Honey Shop",
              "url": "https://sidra-honey-shop.vercel.app",
              "logo": "https://sidra-honey-shop.vercel.app/logo.svg",
              "description": "Premium natural honey products with health benefits",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://facebook.com/sidrahoneyshop",
                "https://instagram.com/sidrahoneyshop",
                "https://whatsapp.com/sidrahoneyshop"
              ]
            })
          }}
        />
      </head>
      <body className={`${baloo.className} antialiased`}>
              <LazyMotion features={domAnimation}>
          <SessionProviders>
            <AppProvider>
              <MantineProvider theme={theme}>
                <Header user={user} />
                {children}
                <Footer />
                <CanvasCursor />
              </MantineProvider>
            </AppProvider>
          </SessionProviders>
        </LazyMotion>
      </body>
    </html>
  );
}
