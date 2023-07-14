import React, { useState, useEffect } from 'react';

import "../Components/syles/Cart.css"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
 const [foods, setFoods] = useState([]);
 const [cartTotal,setCartTotal] = useState(0)

 const [quantity,setQuantity] = useState(1)
 const  navigate= useNavigate()
  useEffect(() => {
    fetchFoods();
  }, [quantity]);

  //function to get token from cookies
  function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
  
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
  
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return null;
  }

  const fetchFoods = () => {

    fetch(`http://localhost:8080/food/cart`,{
        headers:{
            "content-type":"application/json",
            Authorization: getCookie("accessToken")
        }
    })
    .then((res)=> {
        return res.json()
    })
      .then(data => {
        console.log(data)
        setFoods(data.data);
        let total = data.data.reduce((acc,item)=>{
          return acc + item.price*item.quantity
        },0);
        console.log(total)
        setCartTotal(total)
      })
     .catch((error)=>{
        console.log(error)
     })
  };

  async function updateQuantity(itemId,quantity){
    fetch(`http://localhost:8080/food/cart/${itemId}`,{
      method:"PATCH",
      headers:{
        "content-type":"application/json",
        Authorization: getCookie("accessToken")
      },
      body:JSON.stringify({quantity:quantity})

    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.msg === "Cart updated successfully"){
        setQuantity(quantity)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  async function removeFromCart(itemId){
    fetch(`http://localhost:8080/food/cart/${itemId}`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        Authorization: getCookie("accessToken")
      },

    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if(data.msg==="product is removed from the cart"){
       alert("Item removed")
       fetchFoods()
      }
      
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  async function placeOrder(){
    
    fetch(`http://localhost:8080/food/placeorder`,{
      method:"PATCH",
      headers:{
        "content-type":"application/json",
        Authorization: getCookie("accessToken")
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.msg === "Order placed successfully"){
        alert("Your order has been succesfully placed")
          navigate("../Product")
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

    
  return (
    <div style={{ textAlign: 'center' }} className='product-page'>
      <h1>Cart Page</h1>
      <h2>Your cart total:- ${cartTotal}</h2>
      <button className='orderBtn' onClick={()=>{placeOrder()}}>Place your order</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4 ,1fr)', textAlign: 'center', gap: '10px', marginTop:"50px"}}>
        {foods?.map(food => (
          <div key={food._id}>
            <img src={food.image} alt='img' style={{ width: '300px', height: '250px' }} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Price: $ {food.price}</p>
             <div className='cart-btn-container'>
             <button onClick={()=>{updateQuantity(food._id,food.quantity-1)}} disabled={food.quantity===1} className='cartBtn' >-</button>
            <p className='quantity'>{food.quantity}</p>
            <button onClick={()=>{updateQuantity(food._id,food.quantity+1)}} disabled={food.quantity===10} className='cartBtn'>+</button>
             </div>
             <button className='cart-btn remove' onClick={()=>{removeFromCart(food._id)}}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart
