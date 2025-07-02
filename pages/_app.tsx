import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Codeitmall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
