import { useState } from "react";
import styles from "../login/login.module.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phoneNumber: phone,
      password,
    };
    const res = await fetch(`http://localhost:5000/add-user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    if (res.status === 200) navigate("/");
    else setError(true);
  };

  return (
    <div className={styles.login_container}>
      <h2>Sign up</h2>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="number"
            required
            onChange={(e) => setPhone(e.target.value)}
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
        <button type="submit">Sign up</button>
        {error && <p>Phone number already registered</p>}
      </form>
    </div>
  );
}

export default Signup;
