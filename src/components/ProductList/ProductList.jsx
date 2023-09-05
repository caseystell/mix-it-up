import ProductCard from '../ProductCard/ProductCard'

export default function ProductList({ products, handleAddToOrder }) {
    const productCards = products.map((product) => 
        <ProductCard
            product={product}
            key={product._id}
            handleAddToOrder={handleAddToOrder}
        />
    );
    
    return (
        <ul>{productCards}</ul>
    );
}