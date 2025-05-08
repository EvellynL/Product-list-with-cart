import './App.css'
import SingleItem from './components/SingleItem'
import { useState, useEffect } from 'react'

const url = "http://localhost:3000/producs"

function App() {
  const [products, setProducts] = useState([]);
   
  useEffect(() => {
    async function getData() {
        const res = await fetch(url);

        const data = await res.json();

        setProducts(data);
    }

    getData();
  }, []);

  return (
    <>
      <div className='main'>
        <div className="products">
            <h1>Dessert</h1>
            <div className="cards">
                {products.map((product) => (
                <SingleItem
                key={product.id}
                id={product.id}
                name={product.name}
                img={product.img}
                sub_text={product.sub_text}
                Price={product.Price}
              />
          ))}
            </div>
        </div>

        <div className="car">
          <h3>Your cart(0)</h3>
          <p>Your car is empty...</p>
        </div>
        
      </div>
    </>
  )
}

export default App
