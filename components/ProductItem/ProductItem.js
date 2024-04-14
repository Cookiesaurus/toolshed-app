import React from "react";
import Image from "next/image";

const ProductItem = ({ tool, session }) => {
  function RoundToTenth(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(1);
    const roundedNumber = parseFloat(roundedDecimal);
    return roundedNumber;
  }
  function RoundToHun(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
  }
  let toolStatus = session?.isLoggedIn
    ? "item-avaliability"
    : "item-avaliability-notLoggedIn";
  let displayText;
  let divClass;
  let pickupText;
  if (tool.Tool_Status_Details === "Available") {
    toolStatus = toolStatus;
    displayText = "Pick up Today";
    divClass = "availability-green";
    pickupText = "Pick Up";
  } else if (tool.Tool_Status_Details === "Maintenance") {
    toolStatus = toolStatus + " maintenance";
    displayText = "In Maintenance";
    divClass = "availability-orange";
    pickupText = "";
  } else if (tool.Tool_Status_Details === "Disabled") {
    toolStatus = toolStatus + " disabled";
    displayText = "Currently Disabled";
    divClass = "availability-grey";
    pickupText = "";
  } else if (tool.Tool_Status_Details === "Checked Out") {
    toolStatus = toolStatus + " checked-out";
    displayText = "Checked Out";
    divClass = "availability-red";
    pickupText = "";
  }
  return (
    <>
      <div className="product-cont">
        <div className="product-left">
          {tool && (
            <div className="product-img" key={1}>
              <Image
                src={tool.Tool_Link}
                alt={"Product Place Holder"}
                width={400}
                height={600}
                className="product-img"
                priority={true}
              />
            </div>
          )}
        </div>
        <div className="product-right">
          {tool && (
            <React.Fragment>
              <h2 className="product-title">{tool.Tool_Name}</h2>
              <div className={toolStatus}>
                <p className="pickup">{pickupText}</p>
                <div className="availability">
                  <p>{tool.Tool_Status_Details}</p>
                  <p className={divClass}>{displayText}</p>
                </div>
              </div>
              <div className="replace-cont">
                <p className="replacement">Replacement Cost:</p>
                <p className="cost">
                  ${RoundToHun(tool.Tool_Replacement_Cost)}
                </p>
              </div>
              <div className="product-info">
                <div className="info-left">
                  <p className="product-info">
                    Description: {tool.Tool_Description}
                  </p>
                  <p className="product-info">Brand: {tool.Brand_Name}</p>
                  <p className="product-info">
                    Weight: {RoundToTenth(tool.Tool_Weight)} lbs
                  </p>
                  <p className="product-info">Location: {tool.Location_Name}</p>
                </div>
              </div>
              <div className="product-description">
                <p>Categories : {tool.Category_Name}</p>
              </div>
              <div className="product-description">
                <p>Item Types: {tool.Types}</p>
              </div>
              {tool?.Tool_Manual && (
                <div className="produc-manual">
                  <a href={tool.Tool_Manual} target="_blank">
                    Tool Manual
                  </a>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
