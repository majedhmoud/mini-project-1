import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductItem from "./components/ProductItem";
import StatCard from "./components/StatCard";
import AddProduct from "./components/AddProduct";


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}
const PRODUCTS_URL = "/public/products.json";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  async function loadProducts() {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(PRODUCTS_URL);
      const data = (await response.json()) as Product[];
      setProducts(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadProducts();
  }, []);
  const totalCount = products.length;
  const inStockCount = products.reduce(function (count, product) {
    if (product.inStock) {
      return count + 1;
    }

    return count;
  }, 0);
  const outOfStockCount = totalCount - inStockCount;
  function handleAddProduct(name: string, category: string, price: number, inStock: boolean) {
    setProducts((currentProducts) => {
      const highestId = currentProducts.reduce((highest, product) => {
        return product.id > highest ? product.id : highest;
      }, 0);
      const newProduct: Product = {
        id: highestId + 1,
        name: name,
        category: category,
        price: price,
        inStock: inStock,
      };
      return [...currentProducts, newProduct];
    });
  }
  function handleToggleProduct(id: number) {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id === id) {
          return { ...product, inStock: !product.inStock };
        }
        return product;
      }),
    );
  }
  function handleDeleteProduct(id: number) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }
  return (
    <div>
      <Header />
      <main className="container">
        <section className="stats">
          <StatCard label="Total Tasks" value={totalCount} />
          <StatCard label="In Stock" value={inStockCount} />
          <StatCard label="Out Of Stock" value={outOfStockCount} />
        </section>
        {isLoading && <p>Loading products...</p>}
        {!isLoading && hasError && (
          <div className="message error">
            <p>We could not load the products. Please try again.</p>
            <button className="retry-button" onClick={loadProducts}>
              Retry
            </button>
          </div>
        )}
        <AddProduct products={products} onAddProduct={handleAddProduct} />
        <ul className="products-list">
          {products.map((products) => {
            return (
              <ProductItem
                id={products.id}
                name={products.name}
                category={products.category}
                price={products.price}
                inStock={products.inStock}
                onToggle={handleToggleProduct}
                onDelete={handleDeleteProduct}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
