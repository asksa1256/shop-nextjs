import React from "react";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  const q = context.query["q"];
  const res = await axios.get(`/products?q=${q}`);
  const products = res.data.results ?? [];

  return {
    props: {
      products,
      q,
    },
  };
};

export default function Search({ products, q }) {
  return (
    <section>
      <Head>
        <title>{q} 검색 결과 - Codeitmall</title>
      </Head>
      <h2>검색 페이지</h2>
      <SearchForm initialValue={typeof q === "string" ? q : ""} />
      <h3>{q} 검색 결과</h3>
      <ProductList products={products} />
    </section>
  );
}
