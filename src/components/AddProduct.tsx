import { ChangeEvent, FormEvent, useState } from "react";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface AddProductProps {
  products: Product[];
  onAddProduct: (
    name: string,
    category: string,
    price: number,
    inStock: boolean,
  ) => void;
}
const MAX_NAME_LENGTH = 200;
function AddProduct(props: AddProductProps) {
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState("");
  const [draftPrice, setDraftPrice] = useState("");
  const [draftInStock, setDraftInStock] = useState<boolean>(false);
  const [formError, setFormError] = useState("");
  const categories = [...new Set(props.products.map((product) => product.category))];

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftName(event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftCategory(event.target.value);
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftPrice(event.target.value);
  }

  function handleInStockChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftInStock(event.target.checked);
  }

  function handleSubmitChange(event: FormEvent) {
    event.preventDefault();

    const trimmedName = draftName.trim();
    if (!trimmedName) {
      setFormError("Title can't be empty.");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setFormError(`Title must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }

    if (!draftCategory || !categories.includes(draftCategory)) {
      setFormError("Please select a category.");
      return;
    }

    const price = Number(draftPrice);
    if (draftPrice.trim() === "" || !Number.isFinite(price) || price < 0) {
      setFormError("Price must be a number greater than or equal to zero.");
      return;
    }

    props.onAddProduct(trimmedName, draftCategory, price, draftInStock);

    setDraftName("");
    setDraftCategory("");
    setDraftPrice("");
    setDraftInStock(false);
    setFormError("");
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmitChange}>
      <input
        id="product-name"
        className="add-product-input"
        placeholder="Product name"
        aria-label="Product name"
        value={draftName}
        onChange={handleNameChange}
        required
      />
      <input
        type="number"
        min="0"
        step="any"
        className="add-product-input"
        placeholder="Price"
        aria-label="Price"
        value={draftPrice}
        onChange={handlePriceChange}
        required
      />

      <select
        className="add-product-select"
        aria-label="Category"
        value={draftCategory}
        onChange={handleCategoryChange}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => {
          return <option key={category} value={category}>{category}</option>;
        })}
      </select>

      <label className="add-product-stock" htmlFor="inStock">
        <input
        id="inStock"
        type="checkbox"
        className="add-product-checkbox"
        checked={draftInStock}
        onChange={handleInStockChange}
      />
        In Stock
      </label>

      <button className="add-product-button" type="submit">
        Add Product
      </button>

      {formError !== "" && <p className="form-error">{formError}</p>}
    </form>
  );
}
export default AddProduct;
