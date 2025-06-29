import React from "react";
import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  return (
    <section>
      <h2>검색 페이지</h2>
      <SearchForm initialValue={typeof q === "string" ? q : ""} />
      <h3>{q} 검색 결과</h3>
    </section>
  );
}
