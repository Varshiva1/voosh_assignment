import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";

function OrderList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");

  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch("http://localhost:5000/get-order");
    const orderdata = res.json();
    setData(orderdata);
  }
  useEffect(() => {
    getData()
  }, [])

  console.log(data)
  return (
    <>
      {
        user_id ? <div><h2>Order details</h2></div> :
          <div>
            <h2>Order List</h2>
            <div>
              {data?.length > 0 ? data?.map((ele) => <p>{ele}</p>) : <p>No order Found</p>
              } </div>
            <Link to="/add-order">

              <button>Add Order</button>
            </Link>
          </div>}
    </>

  )
}

export default OrderList


