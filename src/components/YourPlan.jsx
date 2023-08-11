import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext.js";
import {useNavigate} from 'react-router-dom'
const YourPlan = () => {
  let history=useNavigate()
  const context = useContext(AppContext)
  const {duration, myplan } = context
  let price=parseInt(myplan.price).toString();
  const [active, setActive] = useState("Active");
  const [cancel, setCancelled] = useState(true);
  const [date, setDate] = useState("Jul 13th, 2020");
  const [btnCheck, setbtnCheck] = useState("Change Plan");
  let dt = new Date();
  let dateTime = dt.toString().split(" ");
  let dateToday = dateTime[1] + " " + dateTime[2] + "th, " + dateTime[3];

  if (duration === "monthly") {
    dt.setMonth(dt.getMonth() + 1);
  } else {
    dt.setFullYear(dt.getFullYear() + 1);
  }
  dt.setHours(dt.getHours() + 24);
  dateTime = dt.toString().split(" ");
  let dateEnd = dateTime[1] + " " + dateTime[2] + "th, " + dateTime[3];
 
  const [info, setInfo] = useState(
    `Your subscription has started on ${dateToday} and will auto renew on ${dateEnd}`
  );
  
  
  const handleCancel = () => {
    setCancelled(!cancel);
    setActive("Cancelled");
    setbtnCheck("Choose Plan");
    dt = new Date();
    dateTime = dt.toString().split(" ");
    let dateEnd = dateTime[1] + " " + dateTime[2] + "th, " + dateTime[3];
    setInfo(
      `Your subscription  was cancelled and you will lose access to services on ${dateEnd}`
    );
  };
  const changePlan=(e)=>{
    e.preventDefault();
    history("/");
  }
  return (
    <>
      <div className="yourplan">
        <div className="header">
          <div className="plan-status">
            <h4 style={{ color: "#000000" }}>Current Plan Details</h4>
            <span className={` ${cancel ? "activeStatus" : "cancelStatus"}`}>
              {active}
            </span>
          </div>
          {cancel && (
            <button className="btn-cancel" onClick={() => handleCancel()}>
              Cancel
            </button>
          )}
        </div>
        <div className="content">
          <p className="content-plan">{myplan.plan}</p>
          <p className="content-devices">{myplan.devices.filter((device) => device.length !== 0).join("+")}</p>
        </div>
        <h3 className="content-price" style={{ color: "#000000" }}>
          <span className="money" >₹ </span>
          <span className="money" style={{fontFamily:"Poppins"}}>
            {
              price.length ===4 ? price[0]+",000":price
            }
          </span>
          <span style={{fontWeight:"500"}}>/yr</span>
        </h3>
        <button className="btn-plan" onClick={changePlan}>{btnCheck}</button>
        <p className="plan-info">
          {info}
        </p>
      </div>
    </>
  );
};

export default YourPlan;
