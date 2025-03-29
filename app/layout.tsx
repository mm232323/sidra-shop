import type { Metadata } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import CanvasCursor from "@/components/CanvasCursor";
const baloo = Baloo_Bhaijaan_2({
  style:'normal',
  subsets:['latin']
})
export const metadata: Metadata = {
  title: "Sidra Honey Shop",
  description: "Sidra Honey Shop for all fresh honey products",
};

import {createTheme, MantineColorsTuple, mantineHtmlProps, MantineProvider} from '@mantine/core'
import Footer from "@/components/layout/Footer";

const myColor: MantineColorsTuple = [
  '#fff6e1',
  '#ffeccb',
  '#ffd79a',
  '#ffc164',
  '#ffaf37',
  '#ffa31b',
  '#ff9d09',
  '#e38800',
  '#cb7800',
  '#b06700'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <body
        className={`${baloo.className} antialiased`}
      >
      <MantineProvider theme={theme}>
        {children}
        <Footer />
    <CanvasCursor />
    </MantineProvider>
      </body>
    </html>
  );
}
