import './ProductCard.css';

function ProductCard({ sku, name, price, type, specific, onChange }) {
  return <div className="product-card">
    <input type="checkbox" className="delete-checkbox" onChange={onChange}/>
    <div className="product-card-content">
      <p>{ sku }</p>
      <p>{ name }</p>
      <p>{ price / 100 }</p>
      <p>{ type }: { specific }</p>
    </div>
  </div>;
}

export default ProductCard;