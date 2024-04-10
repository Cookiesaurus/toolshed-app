import Image from "next/image";
import Link from "next/link";
const InventoryItems = ({ tools, admin }) => {
  const ToolStatus = ({ productItem }) => {
    let statusClass;
    switch (productItem.Tool_Status_Details) {
      case "Available":
        statusClass = "stock-green";
        break;
      case "Checked Out":
        statusClass = "stock-red";
        break;
      case "Maintenance":
        statusClass = "stock-orange";
        break;
      case "Disabled":
        statusClass = "stock-gray";
        break;
      default:
        statusClass = "";
    }

    return <p className={statusClass}>{productItem.Tool_Status_Details}</p>;
  };

  const ToolLocation = ({productItem}) => {
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
  }

  return (
    <>
      <div className="inven-cont">
        <div className="inven-items">
          {tools.length > 0 ? (
            tools.map((productItem, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/inventory/product",
                  query: {
                    product_id: productItem.Tool_ID
                  }
                }}
              >
                <div className="inventory-item">
                  <div className="inventory-image">
                    <Image
                      src={productItem.Tool_Link}
                      alt={"Product Placeholder"}
                      width={230}
                      height={280}
                      className="popular-img"
                      priority={true}
                    />
                  </div>
                  <div className="product-info">
                    <p>{productItem.Tool_Name}</p>
                    <div className="item-aval">
                      <ToolLocation productItem={productItem}/>
                      <ToolStatus productItem={productItem} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryItems;
