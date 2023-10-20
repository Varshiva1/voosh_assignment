import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import styles from "./orders.module.css";

function OrderList() {
  const cookies = new Cookies();
  const [searchParams, setSearchParams] = useSearchParams();
  const order_id = searchParams.get("order_id") || "";

  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch(
      `http://localhost:5000/get-order?order_id=${order_id}`,
      {
        headers: {
          Authorization: cookies.get("token"),
        },
      }
    );
    const orderdata = await res.json();
    setData(orderdata);
  };
  useEffect(() => {
    getData();
  }, [order_id]);

  return (
    <>
      {order_id ? (
        <div>
          <h2>Order details</h2>
          <div className={styles.order_list}>
            <p>Product Name: {data[0]?.productName}</p>
            <p>Qty: {data[0]?.qty}</p>
            <p>Price: {data[0]?.subTotal}</p>
            <p>Phone Number: {data[0]?.phoneNumber}</p>
          </div>
        </div>
      ) : (
        <div className={styles.order_container}>
          <h2>Order List</h2>
          <div className={styles.order_list}>
            {data?.length > 0 ? (
              data?.map((ele) => (
                <div className={styles.order_card}>
                  <div>
                    <p>Product Name: {ele.productName}</p>
                    <p>Qty: {ele.qty}</p>
                  </div>
                  <button
                    onClick={() => setSearchParams({ order_id: ele._id })}
                  >
                    Get details
                  </button>
                </div>
              ))
            ) : (
              <p>No order Found</p>
            )}{" "}
          </div>
          <Link to="/add-order">
            <button>Add Order</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default OrderList;
