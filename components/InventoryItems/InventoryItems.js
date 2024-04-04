import Image from "next/image";
import Link from "next/link";
const InventoryItems = ({tools}) => {

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

  return (
    <>
      <div className="inven-cont">
        <div className="inven-items">
          {tools.map((productItem, index) => {
            return (
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
                    {
                      <Image
                        src={productItem.Tool_Link}
                        alt={"Product Place Holder"}
                        width={230}
                        height={280}
                        className="popular-img"
                      />
                    }
                  </div>
                  <div className="product-info">
                    <p>{productItem.Tool_Name}</p>
                    <div className="item-aval">
                      <p className="light-paragraph">
                        {productItem.Location_Name}
                      </p>
                      <ToolStatus productItem={productItem} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InventoryItems;
