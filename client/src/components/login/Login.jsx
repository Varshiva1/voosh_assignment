import { useState } from "react";
import OrderList from "../OrderList";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [loginby, setLoginBy] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { phoneNumber: phoneNo, password, login_by: "manual" };
    console.log(data);
    const res = await fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const apiData = await res.json();
    if (res.status === 200) {
      cookies.set("token", apiData.token);
      navigate("/order-list");
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.login_container}>
      <h2>Login</h2>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <label>
          Phone Number:{" "}
          <input
            type="number"
            maxLength={10}
            required
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">login</button>
        {error && <p>wrong password or phone number already exist</p>}
      </form>
      <p>
        If you don't have an account then, <Link to="/add-user">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
