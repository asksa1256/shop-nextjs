import React, { useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import Head from "next/head";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await axios.get(`/products`);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

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
