import "./OrderConfirmation.css"
import Confirm from '../assets/icon-order-confirmed.svg'

const OrderConfirmation = ({cart = [], total = 0, NewOrder}) => {

  return (
    <div className="confirmation">
        <div className="container">
            <img src={Confirm} alt="Confirmed" />
            <h1>Order Confirmation</h1>
            <p>We hope you enjoy your food!</p>
        </div>

        <div className="container-dois">
            {console.log("Cart:", cart)}
           {cart.map((item) => (
             <div className="mini-container" key = {item.id}>
                 <img src={item.tumb} alt="baklava" />
                 <div className="texts">
                    <h3>{item.name}</h3>
                    <p>{item.quantity}</p>
                    <p>{item.Price}</p>
                 </div>
                 <h4>${(item.quantity * parseFloat(item.Price.replace("$",""))).toFixed(2)}</h4>
            </div>
           ))}

            <div className="order-total">
                <p>Order total</p>
                <h3>${total}</h3>
            </div>
        </div>

        <button onClick={() => NewOrder()}> Start New Order </button>
    </div>
  )
}

export default OrderConfirmation