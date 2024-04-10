import React from "react";
import Link from "next/link";
import Image from "next/image";

const PopularTools = ({ tools }) => {

  const ToolLocation = ({ productItem }) => {
    let location;
    switch (productItem.Location_Name) {
      case "Main Location":
        location = "Main Location";
        break;
      case "Mobile Unit - Thomas P. Ryan Center (Monday)":
        location = "Thomas P. Ryan Center";
        break;
      case "Mobile Unit - David F. Gantt Reacreation Center (Thursday)":
        location = "David F. Gantt Rec Center ";
        break;
      case "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)":
        location = "Willie Walker Lightfoot RecCenter ";
        break;
      case "Mobile Unit - Edgerton Recreation Center (Tuesday)":
        location = "Edgerton Rec Center";
    }
    return <p className="light-paragraph">{location}</p>;
  };
  return (
    <>
      <h2> Popular Tools</h2>
      <div className="popular-container">
        {tools.map((tool, index) => (
          <div className="popular" key={tool.Tool_ID}>
            <Link
              href={{
                pathname: "/inventory/product",
                query: { product_id: tool.Tool_ID }
              }}
            >
              <div className="img-cont">
                <Image
                  src={tool.Tool_Link}
                  alt={tool.Tool_Name}
                  width={200}
                  height={200}
                  priority={true}
                />
              </div>
              <div className="product-info">
                <p className="product-title">{tool.Tool_Name}</p>
                <p className="stock-green">{tool.Tool_Status_Details}</p>
                <ToolLocation productItem={tool} />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="button-center">
        <button type="submit" tabIndex={-1}>
          {" "}
          <Link href={"/inventory"} className="home-button">
            View All Tools
          </Link>
        </button>
      </div>
    </>
  );
};

export default PopularTools;
