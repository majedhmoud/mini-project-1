interface ProductItemProps {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}


export default function ProductItem(props: ProductItemProps) {
  
  return (
    <li className="list-item">
      <span className="item-text">
        <span className="item-name">{props.name}</span>
        <span className="item-category">{props.category}</span>
        <span className="item-price">{props.price}$</span>
        <span className="item-group-button">
          <button
            className={`task-action-button ${props.inStock}`}
            onClick={() => props.onToggle(props.id)}
          >
            {props.inStock ? "In Stock" : "Out of Stock"}
          </button>
          <button
            className="task-action-button delete-button"
            onClick={() => props.onDelete(props.id)}
          >
            Delete
          </button>
        </span>
      </span>
    </li>
  );
}
