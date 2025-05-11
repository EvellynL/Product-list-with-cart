import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './SingleItem.css';
import { useState, useEffect } from 'react';

const url = "http://localhost:3000/producs";  // Certifique-se de que o endpoint está correto

const SingleItem = ({ id, name, img, sub_text, Price, addToCart }) => {

    return (
        <div className='itens'>
            <img src={img} alt="Produto" />
            <button className="add-to-car" onClick={() => addToCart(id)}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <p>Add to cart</p>
            </button>
            <div className="text">
                <p>{sub_text}</p>
                <h2>{name}</h2>
                <h3>{Price}</h3>
            </div>
        </div>
    );
};

export default SingleItem;
