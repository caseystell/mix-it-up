import ProductList from "../../components/ProductList/ProductList";

export default function AllProductsPage({ products }) {
  return (
    <>
      <h1>All Products</h1>
      <ProductList products={products} />
    </>
  );
}