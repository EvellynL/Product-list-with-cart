import './App.css'
import SingleItem from './components/SingleItem'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import OrderConfirmation from './components/OrderConfirmation';

const url = "http://localhost:3000/producs"

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [loading, setLoading] = useState();
  const divRef = useRef(null);
  const textRef = useRef(null);
   
  useEffect(() => { //pegar os dados do json

    setLoading(true);
    async function getData() {
        const res = await fetch(url);

        const data = await res.json();

        setProducts(data);
        setLoading(false);
    }


    getData();
  }, []);

  useEffect (() => {
    const total = cart.reduce((sum, item) => {
      const valorNumerico = parseFloat(item.Price.replace("$","")) * item.quantity;
      return sum + valorNumerico;
  }, 0);
    setPriceTotal(total.toFixed(2));
  }, [cart]) //atualiza o valor total conforme o carrinho atualiza

  const handleAddToCart  = (id) => {
    const product = products.find(product => product.id === id); //conforme o ID passado verifica qual o produto com o msm id

    setCart(prev => {
      const exists = prev.find(item => item.id === id); //verifica se dentro de itens selecionados se possui o msm ID e retorna true

      if(exists) { //caso seja true mapea os items para saber qual possui o msm ID e aumanta a quantidade
        return prev.map(item =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prev, {...product, quantity: 1}]; //se não for nenhum, apenas quantidade 1
      }
    })

    console.log(cart);

  }

  const HandleRemoveItem = (id) => {
      setCart(prev => {
        return prev
        .map(item => 
          item.id === id ? {...item, quantity: item.quantity - 1} : item
        )
        .filter(item => item.quantity > 0);
      });
  }

  const Order_Confirmation = () => {
    if(cart.length === 0) {
      textRef.current.classList.add('cart-empty');
      textRef.current.classList.remove('hidden');
    }

    else if(divRef.current) {
      
      divRef.current.classList.add('order-confirmation');

      document.body.classList.add('overlay-active');

    }

  }

  const NewOrder = () => {
    if (divRef.current) {
      divRef.current.classList.remove('order-confirmation');
    }

    textRef.current.classList.remove('cart-empty');
    textRef.current.classList.add('hidden');
    document.body.classList.remove('overlay-active');

    setCart([]);
  }



  return (
    <>
      <div className='main'>
        <div className="products">
            <h1>Dessert</h1>
            <div className="cards">
                { loading ? <p>Carregando ...</p> : products.map((product) => (
                <SingleItem
                key={product.id}
                id={product.id}
                name={product.name}
                img={product.img}
                sub_text={product.sub_text}
                Price={product.Price}
                addToCart={handleAddToCart}
              />
          ))}
            </div>
        </div>

        <div className="car">
          <h3>Your cart({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
          {cart.map((car) => (
            <div className="itens-to-car" key={car.id}>
              <h3>{car.name}</h3>
              <div className="itens-select">
                  <div className="itens-information">
                    <p id="quantidade">{car.quantity}x</p>
                    <p>@{car.Price}</p>
                    <p id="price-total-un">${(car.quantity * parseFloat(car.Price.replace("$", ""))).toFixed(2)}</p>
                  </div>

                  <button id="remove" onClick={() => HandleRemoveItem(car.id)}>
                      <FontAwesomeIcon icon={faTimes} />
                  </button>
              </div>
            </div>
          ))}
          
          <div className="order-total">
            {cart.length === 0 ? (
                <p>Seu carrinho está vazio...</p>
              ) : (
                <>
                  <p>Order Total</p>
                  <h2>${priceTotal}</h2>
                </>
              )}

          </div>

          <button id="confirm" onClick={() => Order_Confirmation()}>
            Confirm Order
          </button>

          <p class="hidden" ref = {textRef}>Por favor, adicione algo ao carrinho!</p>

        </div>

        <div ref = {divRef} className='hiden'>
          <OrderConfirmation cart = {cart} total={priceTotal} NewOrder={NewOrder}/>
        </div>
        
      </div>
    </>
  )
}

export default App
