import React, { useContext,useEffect, useState } from "react";
import AppContext from "../context/AppContext.js";
import { monthly, yearly } from "./data.jsx";
import Pack from "./Pack.jsx";
import {useNavigate} from 'react-router-dom'
const Plan = () => {
  const context = useContext(AppContext)
    const { setMyplan,setDuration } = context
  let history=useNavigate()
  const [currPack, setCurrPack] = useState(yearly);
  const [currPlan, setCurrPlan] = useState({
    plan: "Mobile",
    price: 1000,
    quality: "Good",
    res: "480p",
    devices: ['Phone','Tablet'],
  });
  useEffect(() => {
    
    if(sessionStorage.getItem('token'))
    {
      // getnotes();
    }
    else{
      document.getElementsByTagName('body')[0].style.backgroundColor="#1f4d91";
      history("/login");
    }
  }, [])
  document.getElementsByTagName('body')[0].style.backgroundColor="white";
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [plans, setPlan] = useState(["Mobile", "Basic", "Standard", "Premium"]);

  const handlePlan = (index, e) => {
    const temp=document.getElementsByClassName("top-bar")
    console.log(temp)
 
    Array.from(temp).forEach(element => {
      if(element.classList.contains("selected"))
      element.classList.remove("selected")
      
    });
    e.target.classList.add("selected");
    setSelectedPlan(index);
    setCurrPlan({
      ...currPlan,
      plan: plans[index],
      price: currPack[0][index],
      quality: currPack[1][index],
      res: currPack[2][index],
      devices: [currPack[3][index],currPack[4][index],currPack[5][index],currPack[6][index]],
    });
  };

  const handleToggle = () => {
    setIsYearly(!isYearly);
    if (!isYearly) {
      setCurrPack(yearly);
      // setCurrPlan();
      document.getElementsByClassName("toggle-thumb")[0].innerHTML="Yearly";
    } else {
      setCurrPack(monthly);
      // setCurrPlan();
      document.getElementsByClassName("toggle-thumb")[0].innerHTML="Monthly";
    }
    
  };

  const handleSubmit=async(e)=>{
    document.getElementsByTagName('body')[0].style.backgroundColor="#1f4d91";
    e.preventDefault();
    if(isYearly)
    {
      setDuration('yearly')
    }
      else
      {
        setDuration('monthly')
      }
      
    setMyplan({...currPlan})
        history("/payment")
  }
  return (
    <section>
      <div className="plan-container">
      <h3 className="plan-head">Choose the right plan for you</h3>
        <div className="grid-container top-container" id="">
          <div className="grid-item" style={{ textAlign: "left" }}>
            <div
              className={`toggle-switch ${isYearly ? "yearly" : "monthly"}`}
              onClick={handleToggle}
            >
              <div className="toggle-thumb">Yearly</div>
              <div className="toggle-labels">
                <span>Monthly</span>
                <span>Yearly</span>
              </div>
            </div>
          </div>
          {plans.map((plan, index) => {
            return (
              <div
                key={index}
                // grid-item selected
                className={`top-bar ${index==0 ? 'selected' : ''}`}
                onClick={(e) => handlePlan(index, e)}
              >
                {plan}
              </div>
            );
          })}
        </div>

        <div className="grid-container underline" style={{ textAlign: "left" }}>
          <div className="grid-item">Monthly Price</div>
          <Pack currPack={currPack[0]} selectedPlan={selectedPlan} />
        </div>
        {/* <div className="underline"></div> */}
        <div className="grid-container underline" style={{ textAlign: "left" }}>
          <div className="grid-item">Video Quality</div>
          <Pack currPack={currPack[1]} selectedPlan={selectedPlan} />
        </div>
        {/* <div className="underline"></div> */}
        <div className="grid-container underline" style={{ textAlign: "left" }}>
          <div className="grid-item">Resolution</div>
          <Pack currPack={currPack[2]} selectedPlan={selectedPlan} />
        </div>
        {/* <div className="underline"></div> */}
        <div className="grid-container" style={{ textAlign: "left" }}>
          <div className="grid-item">Devices you can use to watch</div>
          <Pack currPack={currPack[3]} selectedPlan={selectedPlan} idx={3} />
        </div>
        <div className="grid-container">
          <div className="grid-item"></div>
          <Pack currPack={currPack[4]} selectedPlan={selectedPlan} idx={4} />
        </div>
        <div className="grid-container">
          <div className="grid-item"></div>
          <Pack currPack={currPack[5]} selectedPlan={selectedPlan} idx={5} />
        </div>
        <div className="grid-container">
          <div className="grid-item"></div>
          <Pack currPack={currPack[6]} selectedPlan={selectedPlan} idx={6} />
        </div>
        <button className="next-btn" onClick={handleSubmit}>Next</button>
      </div>
    </section>
  );
};

export default Plan;
