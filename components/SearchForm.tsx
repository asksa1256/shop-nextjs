import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";

type SearchFormProps = {
  initialValue: string;
};

export default function SearchForm({ initialValue }: SearchFormProps) {
  const [value, setValue] = useState<string>(initialValue);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/search?q=${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="q" value={value} onChange={handleChange} />
      <button>검색</button>
    </form>
  );
}
