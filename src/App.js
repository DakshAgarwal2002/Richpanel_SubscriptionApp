import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ConfirmPlan from './components/ConfirmPlan';
import Login from './components/Login';
import Payment from './components/Payment';
import Signup from './components/Signup';
import Plan from './components/Plan';
import AppState from './context/AppState';
import YourPlan from './components/YourPlan';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise=loadStripe("pk_test_51NdmpESJLHvrRzKqIA5ab2gyp3XOkm9p6hZFWLr6gEOAkeIfMyHugcTWZfg9k5ZTGixWrMGp43ArPzmtb14V0acg00vzklZLJx")
function App() {

  return (
    <>
    <AppState>
      <Router>
        <Routes>
        <Route exact path="/" element={<Plan/>}/>
          <Route exact path="/login"  element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/yourplan" element={<YourPlan/>}/>

          <Route exact path="/payment" element={<Elements stripe={promise}>
            <Payment/>
          </Elements>}/>
        </Routes>
      </Router>
      </AppState>
    </>
  );
}

export default App;
