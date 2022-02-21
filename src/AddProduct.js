import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'

function AddProduct() {
  let navigate = useNavigate();

  let types = {
    "Size": "DVD",
    "Weight": "Book",
    "Dimension": "Furniture",
  }

  let [type, setType] = useState("Size");

  function handleChange(e) {
    setType(e.target.value);
    document.getElementById("specific").value = "";
  }

  function updatePrice(e) {
    let price = Math.floor(e.target.value * 100);
    document.getElementById("realPrice").value = price;
  }

  function updateSize(e) {
    let specific = e.target.value.toString();
    document.getElementById("specific").value = specific;
  }

  function updateWeight(e) {
    let specific = e.target.value.toString();
    document.getElementById("specific").value = specific;
  }

  function updateDimension(e) {
    let height = document.getElementById('height').value.toString();
    let width = document.getElementById('width').value.toString();
    let depth = document.getElementById('length').value.toString();
    document.getElementById("specific").value = height + 'x' + width + 'x' + depth;
  }

  function save() {
    let form = document.querySelector('form');
    let data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    console.log([...data.entries()])
    let all_filled = [...data.values()]
      .map(value => !!value)
      .reduce((acc, val) => acc && val, true);
    if (!all_filled) {
      alert("Please, submit required data");
    } else {
      fetch('https://scandiweb-back.000webhostapp.com/products', {
        method: 'POST',
        body: data
      }).then(res => res.json() )
        .then(res => {
          navigate('/');
        }, error => {
          alert(error.message);
        });
    }
  }

  return (
    <div className="add-product">
      <header>
        <h1>Add Product</h1>
        <div className="spacer"></div>
        <button onClick={save}>Save</button>
        <Link to="/"><button>Cancel</button></Link>
      </header>
      <form id="product_form">
        <label htmlFor="sku">SKU: </label>
        <input type="text" id="sku" name="sku" required/>
        <br/>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required/>
        <br/>
        <label htmlFor="price">Price: </label>
        <input type="number" id="price" step="0.01" required onChange={updatePrice}/>
        <input style={{display:'none'}} type="number" step="1" name="price" id="realPrice"/>
        <br/>
        <label htmlFor="productType">Type: </label>
        <select id="productType" onChange={handleChange} name="type">
          {
            Object.entries(types).map(([key, value]) => {
              return <option key={key} value={key}>{value}</option>
            })
          }
        </select>
        {
          type === "Size" ? (
            <div id="DVD">
              <label htmlFor="size">Size (MB) </label>
              <input type="number" id="size" step="1" required onChange={updateSize}/>
            </div>
          ) : null
        }
        {
          type === "Weight" ? (
            <div id="Book">
              <label htmlFor="weight">Weight (Kg) </label>
              <input type="number" id="weight" step="1" required onChange={updateWeight}/>
            </div>
          ) : null
        }
        {
          type === "Dimension" ? (
            <div id="Furniture">
              <label htmlFor="height">Height (cm) </label>
              <input type="number" id="height" step="1" required onChange={updateDimension}/>
              <br/>
              <label htmlFor="width">Width (cm) </label>
              <input type="number" id="width" step="1" required onChange={updateDimension}/> 
              <br/>
              <label htmlFor="length">Length (cm) </label>
              <input type="number" id="length" step="1" required onChange={updateDimension}/>
            </div>
          ) : null
        }
        <input style={{display:'none'}} type="text" name="specific" id="specific"/>
      </form>
    </div>
  )
}

export default AddProduct;