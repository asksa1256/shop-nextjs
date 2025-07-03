import React from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import SizeReviewList from "@/components/SizeReviewList";
import styles from "@/styles/Product.module.css";
import Spinner from "./../../components/Spinner";

interface Product {
  id: string;
  name: string;
  imgUrl: string;
}

export const getServerSideProps = async (context) => {
  const productId = context.params["id"]; // useRouter 훅을 쓸 수 없는 대신 getStaticProps에서 제공하는 파라미터 'context'에서 params 값을 받아와 사용
  let product: Product;

  try {
    const res = await axios.get(`/products/${productId}`);
    product = res.data;
  } catch {
    return {
      notFound: true, // 정적 생성 설정도 안 되어있고, 데이터 없는 경우 404 페이지 리턴
    };
  }

  const res = await axios.get(`/size_reviews?product_id=${productId}`);
  const sizeReviews = res.data.results ?? [];

  return {
    props: {
      product,
      sizeReviews,
    },
  };
};

export default function Product({ product, sizeReviews }) {
  if (!product)
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );

  return (
    <section>
      <div className="product">
        <h2>{product.name}</h2>
        <div className={styles.image}>
          <Image src={product.imgUrl} alt={product.name} fill />
        </div>
      </div>
      <div className="size-review">
        <SizeReviewList sizeReviews={sizeReviews ?? []} />
      </div>
    </section>
  );
}
