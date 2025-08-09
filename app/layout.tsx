import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import CanvasCursor from "@/components/CanvasCursor";
const baloo = Baloo_Bhaijaan_2({
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

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
        <meta name="theme-color" content="#ffa01c" />
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
