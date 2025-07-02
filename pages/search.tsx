import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import Head from "next/head";

export default function Search() {
  const [products, setProducts] = useState();
  const router = useRouter();
  const { q } = router.query;

  async function getProducts(query: string | string[]) {
    const res = await axios.get(`/products?q=${query}`);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q);
  }, [q]);

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
