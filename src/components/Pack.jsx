import React from "react";

const Pack = ({ currPack, idx, selectedPlan }) => {
  // console.log(currPack);
  return (
    <>
      {currPack.map((val, index) => {
        return (
          <div
            className="grid-item mini"
            key={index}
            style={{
              fontSize: idx >= 3 ? "8pt" : "10pt",
              marginTop: idx == 3 ? "1.3rem" : "",
              color: index === selectedPlan ? "#1f4d91" : "#515151",
            }}
          >
            {val}
          </div>
        );
      })}
    </>
  );
};

export default Pack;
