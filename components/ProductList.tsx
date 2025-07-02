import Link from "next/link";
import styles from "@/components/ProductList.module.css";
import Image from "next/image";

interface Product {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products = [] }: ProductListProps) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/items/${product.id}`}>
            <div className="image">
              <Image fill src={product.imgUrl} alt={product.name} />
            </div>
            <span className={styles.productName}>{product.name}</span>
            <br />
            {product.price}원
          </Link>
        </li>
      ))}
    </ul>
  );
}
