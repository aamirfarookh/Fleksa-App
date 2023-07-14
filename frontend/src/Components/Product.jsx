import React, { useState, useEffect} from 'react';
import {useNavigate } from "react-router-dom";
import "../Components/syles/Product.css";


function Product() {
  const [foods, setFoods] = useState([]);
  
  const  navigate= useNavigate()
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    fetch(`http://localhost:8080/food/fetchFood`)
      .then(response => response.json())
      .then(data => {
        setFoods(data);
        
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    function addToCart(food){
      // console.log({msg:document.cookie})
      // console.log(food)
     fetch(`http://localhost:8080/food/cart` ,{

        method:"PATCH",
        headers:{
          'Content-Type': 'application/json',
          Authorization: getCookie("accessToken"),
        },
        body:JSON.stringify(food)
      }).then((data)=>{
        return data.json()
      }).then((res)=>{
         if(res.msg === "Product added to cart")   {
          alert("product added to cart")
          navigate("../Cart")
         }
         else{
          alert(res.msg)
         }
        
      })
    }


  return (
    <div style={{textAlign:"center"}} className='product-page'>
      <h1>Product Page</h1>
      
    <div className='product-grid'>
      {foods.map(food => (
        <div key={food._id}  className='product-card'>
          <img src= {food.image} alt='img' />
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <p>Price:$ {food.price}</p>
          <button onClick={()=>{
            addToCart(food)
          }} >Add to Cart</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Product;
