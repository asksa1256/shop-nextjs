import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import SizeReviewList from "@/components/SizeReviewList";

interface Product {
  name: string;
  imgUrl: string;
}

// product/[param].js
export default function Product() {
  const [product, setProduct] = useState<Product>();
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getProduct(targetId: string | string[]) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProduct = res.data;
    setProduct(nextProduct);
  }

  async function getSizeReview(targetId: string | string[]) {
    const res = await axios.get(`/size_reviews?product_id=${targetId}`);
    const nextSizeReview = res.data.results ?? [];
    setSizeReviews(nextSizeReview);
  }

  useEffect(() => {
    if (!id) return;
    getProduct(id);
    getSizeReview(id);
  }, [id]);

  if (!product) return null;

  return (
    <section>
      <div className="product">
        <h2>{product.name}</h2>
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={400}
          height={400}
        />
      </div>
      <div className="size-review">
        <SizeReviewList sizeReviews={sizeReviews} />
      </div>
    </section>
  );
}
