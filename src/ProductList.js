import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './ProductList.css';
import './Header.css';


function ProductList() {
  let [error, setError] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [items, setItems] = useState([]);

  useEffect(() => {
    if (!loaded) {
      fetch('https://scandiweb-back.000webhostapp.com/products')
      // fetch('http://localhost/products')
        .then(res => res.json())
        .then(res => {
          setLoaded(true);
          console.log('HELLO', res);
          setItems(res.records ?? []);
        }, (error) => {
          setLoaded(true);
          setError(error);
        });
    }
  }, [loaded]);

  console.log({items});

  let selected = items
    .map(item => item.sku)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: false
      }
    }, {})

  function changeSelection(key) {
    selected[key] = !selected[key];
  }

  function massDelete() {
    Object.entries(selected)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .forEach(sku => {
        fetch(`https://scandiweb-back.000webhostapp.com/products/${sku}?method=DELETE`)
        // fetch(`http://localhost/products/${sku}?method=DELETE`)
          .then(res => res.json())
          .then(res => {
            setLoaded(false);
          }, error => {
            alert(error.message)
          });
      });
  }

  return (
    <div className="product-list">
      <header>
        <h1>Product List</h1>
        <div className="spacer"></div>
        <button onClick={() => setLoaded(false)}>Reload</button>
        <Link to="/add-product"><button>ADD</button></Link>
        <button id="delete-product-btn" onClick={massDelete}>MASS DELETE</button>
      </header>
      {
        error ? <div>Error: {error.message}</div> : null
      }
      {
        !loaded ? <div>Loading...</div> : null
      }
      {
        loaded && !error && items.length > 0 ? (
          <div className="card-holder">
            {
              items.map(item => (
                <ProductCard 
                  key={item.sku} 
                  sku={item.sku} 
                  name={item.name} 
                  price={item.price} 
                  type={item.type} 
                  specific={item.specific}
                  onChange={() => changeSelection(item.sku)} />
              ))
            }
          </div>
        ) : null
      }
    </div>
  );
}

export default ProductList;