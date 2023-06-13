import React, { useState, useEffect } from 'react';
import InputLayout from './components/sellerDashboard/InputLayout';
import Cart from './components/cart/Cart';
import BuyerItems from './components/buyerDashboard/BuyerItems';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const API_BASE_URL = 'https://crudcrud.com/api/9e35f5a1e0134621a4779666bda9c157';

const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async newItem => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setItems(prevItems => [...prevItems, data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const addToCart = item => {
    setCartItems(prevCartItems => [...prevCartItems, item]);
  };

  return (
    <div>
      <InputLayout onAddItem={addItem} />
      <BuyerItems items={items} onAddToCart={addToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default App;