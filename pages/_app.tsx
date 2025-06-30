import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
