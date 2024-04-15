import React from "react";
import Image from "next/image";

const ProductItem = ({ tool, session }) => {

  function RoundToTenth(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(1);
    const roundedNumber = parseFloat(roundedDecimal);
    return roundedNumber;
  }
  function RoundToHun(decimal){
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
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
              <div className={session?.isLoggedIn ? "item-avaliability" : "item-avaliability-notLoggedIn"}>
                <p className="pickup">Pickup</p>
                <div className="availability">
                  <p>{tool.Tool_Status_Details}</p>
                  <p className="stock-green">Today</p>
                </div>
              </div>
              <div className="replace-cont">
                <p className="replacement">Replacement Cost:</p>
                <p className="cost">${RoundToHun(tool.Tool_Replacement_Cost)}</p>
              </div>
              <div className="product-info">
                <div className="info-left">
                  <p className="product-info">Brand: {tool.Brand_Name}</p>
                  <p className="product-info">Weight: {RoundToTenth(tool.Tool_Weight)} lbs</p>
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
