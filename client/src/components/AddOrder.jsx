import { useState } from "react";
import styles from "./login/login.module.css";
import Cookies from "universal-cookie";

export default function AddOrder() {
  const cookies = new Cookies();
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { productName, qty, subTotal: price };
    const res = await fetch("http://localhost:5000/add-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setMsg("Successfully added");
    }
  };

  return (
    <div className={styles.login_container}>
      <h2>Add order</h2>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <label>
          Product Name:{" "}
          <input
            type="text"
            required
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Qty:{" "}
          <input
            type="number"
            required
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
        <label>
          Price:{" "}
          <input
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
