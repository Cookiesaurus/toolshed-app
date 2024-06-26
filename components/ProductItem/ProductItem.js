"use client"
import React from "react";
import Image from "next/image";
import { pickUpTool } from "@/actions/customerActions";
import Toast from "@/components/Toast";
import ErrorToast from "../ErrorToast";
import { useState } from "react";
const ProductItem = ({ tool, session }) => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const loggedIn = session?.isLoggedIn;

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

  let toolID = tool?.Tool_ID
  let status = tool?.Tool_Status_Details;
  let toolName = tool?.Tool_Name;
  let pickupLoc = tool?.Location_Name;
  let email;
  let accountID;

  if(session?.isLoggedIn){
    accountID = session?.user?.Account_ID
    email =  session?.user?.Email
    accountID = JSON.parse(JSON.stringify(accountID))
    email = JSON.parse(JSON.stringify(email))
  }

  function handleButtonClick(){
    pickUpTool(toolID, accountID, email, status, toolName, pickupLoc)
      .then((response) => {
       if(response.status === 'too many'){
        setShowErrorToast(true)
       }else if(response.status === 'error'){
        setShowErrorToast(true)
       }else if(response.status === 'success'){
        setShowToast(true);
       }else if(response.status === 'not able to be reserved at this time'){
        setShowErrorToast(true)
       }else{
        console.log(response.status)
       }
      })
      .catch((error) => {
        // Handle other potential errors, e.g., network error
      });
  }


  return (
    <>
      <div className="product-cont">
      {showErrorToast && <ErrorToast message="Tool cannot be reserved at this time!" />}
      {showToast && <Toast message="Tool has been reserved!" />}
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
              <div className={toolStatus} onClick={loggedIn && (tool?.Tool_Status_Details !== 'Disabled' || 'Maintenance' || 'Checked Out' )  ? handleButtonClick : undefined}>
                <p className="pickup">{pickupText}</p>
                <div className="availability">
                  <p>{tool.Tool_Status_Details}</p>
                  <p className={divClass}>{displayText}</p>
                </div>
              </div>
              <div className="replace-cont">
                <p className="replacement"><strong>Replacement Cost:</strong></p>
                <p className="cost">
                  ${RoundToHun(tool.Tool_Replacement_Cost)}
                </p>
              </div>
              <div className="product-info">
                <div className="info-left">
                  {tool?.Tool_Description && (
                  <p className="product-info"><strong>Description:</strong> {tool.Tool_Description}</p>
                )}
                  <p className="product-info"><strong>Brand:</strong> {tool.Brand_Name}</p>
                  <p className="product-info">
                    <strong>Weight:</strong> {RoundToTenth(tool.Tool_Weight)} lbs
                  </p>
                  <p className="product-info"><strong>Location:</strong> {tool.Location_Name}</p>
                </div>
              </div>
              <div className="product-description">
                <p><strong>Categories:</strong> {tool.Category_Name}</p>
              </div>
              <div className="product-description">
                <p><strong>Item Types:</strong> {tool.Types}</p>
              </div>
              {tool?.Tool_Manual && (
                <div className="produc-manual">
                  <a className="tool-manual" href={tool.Tool_Manual} target="_blank">Tool Manual</a>
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
