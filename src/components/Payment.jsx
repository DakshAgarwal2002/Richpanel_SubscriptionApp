import React,{useContext,useEffect} from 'react'
import AppContext from "../context/AppContext.js";
import {useNavigate} from 'react-router-dom'
import Stripe from 'stripe';
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// axios.defaults.baseURL = "/api";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Payment = () => {
  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51NdmpESJLHvrRzKqIA5ab2gyp3XOkm9p6hZFWLr6gEOAkeIfMyHugcTWZfg9k5ZTGixWrMGp43ArPzmtb14V0acg00vzklZLJx"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);

  const context = useContext(AppContext)
  const { addPlan,myplan,setMyplan,duration, setDuration } = context
  let history=useNavigate()

  const handleSubmit=async(e)=>{
    // const cardElement = elements.getElement(CardElement);
    e.preventDefault();
    let values={expiry:"11/23",cvc:"123",name:"Daksh Agarwal",email:"dakshagarwal@gmail.com",amount:400}
    
      setDuration(duration)
      
    setMyplan({...myplan})
    await sleep(300);
    try {
      window.Stripe.card.createToken(
        {
          number: '4242 4242 4242 4242',
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.name,
        },
        async (status, response) => {
          // console.log("pppppp")
          if (status === 200) {
            // console.log("ioasia")
            await axios
              .post("http://localhost:5000/api/stripe-payment", {
                token: response,
                email: values.email,
                amount: values.amount,
              })
              .then((res) =>{
                console.log("Hellojj")
                window.alert(JSON.stringify(res.data, 0, 2))
              } 
              )
              .catch((err) => console.log(err));
          } else {
            console.log(response.error.message);
          }
        }
      );
    } catch (error) {}
  

    
    await addPlan(duration,myplan.plan);
        history("/yourplan")

  }
  return (
    <>
    <div className='payment-container'>
        <div className='payment-container-1'>
            <div className='payment-card'>
            <h2 style={{margin:0,marginBottom:"3px"}}>Complete Payment</h2>
            <p style={{margin:0, color:"#6C757D",fontWeight:"500",fontSize:"12.5px"}}>Enter your credit or debit card details below</p>
            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="card-element-container">
                <CardElement className="card-element" />
              </div>
              <button type="submit" className="payment-btn">
                Confirm Payment
              </button>
            </form>
            </div>
        </div>
        <div className='payment-container-2'>
            <div className='payment-card'>
            <h3 style={{padding:"6px 0"}}>Order Summary</h3>
            <table>
              <tr>
                <td className='col1'>Plan Name</td>
                <td className='col2'>{myplan.plan}</td>
              </tr>
              <tr>
                <td className='col1'>Billing Cycle</td>
                <td className='col2'>{duration}</td>
              </tr>
              <tr>
                <td className='col1'>Plan price</td>
                <td className='col2'>₹ {myplan.price}/mo</td>
              </tr>
            </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Payment