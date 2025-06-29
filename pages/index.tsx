import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div>
      <h1>Codeitmall</h1>
      <SearchForm initialValue="" />
      <ul>
        <li>
          <Link href="/products/1">첫 번째 상품</Link>
        </li>
        <li>
          <Link href="/products/2">두 번째 상품</Link>
        </li>
        <li>
          <Link href="/products/3">세 번째 상품</Link>
        </li>
        <li>
          <Link href="https://codeit.kr">코드잇</Link>
        </li>
      </ul>
    </div>
  );
}
