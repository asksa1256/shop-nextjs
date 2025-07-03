import React, { FormEvent, useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import SizeReviewList from "@/components/SizeReviewList";
import styles from "@/styles/Product.module.css";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Button from "@/components/Button";
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

export default function Product({ product, sizeReviews: initialSizeReviews }) {
  const [sizeReviews, setSizeReviews] = useState(initialSizeReviews);
  const [formValue, setFormValue] = useState({
    size: "M",
    sex: "male",
    height: 173,
    fit: "good",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sizeReview = {
      ...formValue,
      productId: product.id,
    };

    const res = await axios.post("/size_reviews/", sizeReview);
    const newSizeReview = res.data;
    setSizeReviews((prev) => [newSizeReview, ...prev]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

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
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>사이즈 추천</h2>
        <SizeReviewList sizeReviews={sizeReviews ?? []} />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
        <form className={styles.sizeForm} onSubmit={handleSubmit}>
          <label className={styles.label}>
            사이즈
            <Dropdown
              className={styles.input}
              name="size"
              value={formValue.size}
              options={[
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
                { label: "XL", value: "XL" },
              ]}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            성별
            <Dropdown
              className={styles.input}
              name="sex"
              value={formValue.sex}
              onChange={handleChange}
              options={[
                { label: "남성", value: "male" },
                { label: "여성", value: "female" },
              ]}
            />
          </label>
          <label className={styles.label}>
            키
            <Input
              className={styles.input}
              name="height"
              min="50"
              max="200"
              type="number"
              value={formValue.height}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.label}>
            사이즈 추천
            <Dropdown
              className={styles.input}
              name="fit"
              value={formValue.fit}
              options={[
                { label: "작음", value: "small" },
                { label: "적당함", value: "good" },
                { label: "큼", value: "big" },
              ]}
              onChange={handleChange}
            />
          </label>
          <Button className={styles.submit} as={undefined}>
            작성하기
          </Button>
        </form>
      </section>
    </section>
  );
}
