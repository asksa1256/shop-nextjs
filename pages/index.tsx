import React, { useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import Head from "next/head";

// 정적 생성 (SSG)
export const getStaticProps = async () => {
  const res = await axios.get("/products");
  const products = res.data.results;

  return {
    props: {
      products,
    },
  };
};

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Codeitmall</title>
      </Head>
      <h1>코드잇몰</h1>
      <SearchForm initialValue="" />
      <ProductList products={products} />
    </div>
  );
}
