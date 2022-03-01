import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'
import './AddProduct.css'

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
    let body = [];
    data.forEach((value, key) => {
      obj[key] = value;
      body.push(`${key}=${value}`);
    });
    body = body.join('&');
    console.log(body);
    let all_filled = [...data.values()]
      .map(value => !!value)
      .reduce((acc, val) => acc && val, true);
    if (!all_filled) {
      alert("Please, submit required data");
    } else {
      fetch(`https://scandiweb-back.000webhostapp.com/products/${obj['sku']}`, {
      // fetch(`http://localhost:80/products/${obj['sku']}`, {
        method: 'POST',
        body: body,
        headers: { // Send header to identify the request as JSON
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json() )
        .then(res => {
          console.log(res);
          if (!res.error && !res.message.includes('Unable')) {
            navigate('/');
          }
        }, error => {
          console.error(error);
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
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="sku">SKU: </label>
              </td>
              <td>
                <input type="text" id="sku" name="sku" required/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">Name: </label>
              </td>
              <td>
                <input type="text" id="name" name="name" required/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="price">Price: </label>
              </td>
              <td>
                <input type="number" id="price" step="0.01" required onChange={updatePrice}/>
                <input style={{display:'none'}} type="number" step="1" name="price" id="realPrice"/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="productType">Type: </label>
              </td>
              <td>
                <select id="productType" onChange={handleChange} name="type">
                  {
                    Object.entries(types).map(([key, value]) => {
                      return <option key={key} value={key}>{value}</option>
                    })
                  }
                </select>
              </td>
            </tr>
            {
              type === "Size" ? (
                <tr>
                  <td>
                    <label htmlFor="size">Size (MB) </label>
                  </td>
                  <td>
                    <input type="number" id="size" step="1" required onChange={updateSize}/>
                  </td>
                </tr>
              ) : null
            }
            {
              type === "Weight" ? (
                <tr>
                  <td>
                    <label htmlFor="weight">Weight (Kg) </label>
                  </td>
                  <td>
                    <input type="number" id="weight" step="1" required onChange={updateWeight}/>
                  </td>
                </tr>
              ) : null
            }
            {
              type === "Dimension" ? (
                <>
                <tr>
                  <td>
                    <label htmlFor="height">Height (cm) </label>
                  </td>
                  <td>
                    <input type="number" id="height" step="1" required onChange={updateDimension}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="width">Width (cm) </label>
                  </td>
                  <td>
                    <input type="number" id="width" step="1" required onChange={updateDimension}/> 
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="length">Length (cm) </label>
                  </td>
                  <td>
                    <input type="number" id="length" step="1" required onChange={updateDimension}/>
                  </td>
                </tr>
                </>
              ) : null
            }
          </tbody>
        </table>
        <input style={{display:'none'}} type="text" name="specific" id="specific"/>
      </form>
    </div>
  )
}

export default AddProduct;