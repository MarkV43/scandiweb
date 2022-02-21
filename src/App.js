import {
  Routes,
  Route
} from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/" element={<ProductList/>}/>
      </Routes>
    </div>
  )
}

export default App;