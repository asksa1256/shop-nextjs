import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Container from "@/components/Container";

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
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
