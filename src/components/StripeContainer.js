import React from "react";
import { useCartContext } from "../context/CartContext";
import {loadStripe} from '@stripe/stripe-js';
import { Button } from "../styles/Button";
import styled from "styled-components";

const StripeContainer = () => {
  const { cart, total_item, shipping_fee, total_amount, clearCart} = useCartContext();

    const makePayment =  async() =>{


        const stripe = await loadStripe("pk_test_51NqrX2SAya69TUBdjscWQUvfIpwKLNTLVoVZtJynMZpGlEC48qifNP7n21xj6ci9XuOZlaWV2Z7LpSti2altD7IX002bMtCUmE");

        const body = {
          product: cart,
          total_item,
          shipping_fee, 
          total_amount
      }
      const headers = {
          "content-type":"application/json"
      }
      const response = await fetch("http://localhost:8282/payment",{
          method:"POST",
          headers: headers,
          body: JSON.stringify(body)
      });

      const session =  await response.json();

      const result = stripe.redirectToCheckout({
          sessionId: session.id
      });

      if(result.error){
          console.log(result.error);
      } 

      
    // Check to see if this is a redirect back from Checkout

    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
     clearCart();
    }
   if(query.get("canceled")){
      alert("Order canceled -- continue to shop around and checkout when you're ready.")
   }

  }

 




  return (
    <Wrapper>
    <div className="container">
     <Button onClick={makePayment} className="center" >Pay Now</Button>
     </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`

.container{
  display :flex;
  justify-content: center;
}


`
export default StripeContainer;
