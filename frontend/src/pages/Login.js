import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.msg);

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.href = "/dashboard";

    } catch (err) {

      console.log(err);

      alert("Login Failed");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          🔐 Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login
        </button>

        <p style={styles.text}>
          Don't have an account?
        </p>

        <a
          href="/register"
          style={styles.link}
        >
          Register Here
        </a>

      </div>

    </div>

  );
}

const styles = {

  container: {

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background:
      "linear-gradient(to right, #8360c3, #2ebf91)",

  },

  card: {

    background: "white",

    padding: "40px",

    borderRadius: "15px",

    width: "350px",

    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.3)",

    textAlign: "center",

  },

  heading: {

    marginBottom: "20px",

    color: "#333",

  },

  input: {

    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid gray",

  },

  button: {

    width: "100%",

    padding: "12px",

    background: "#2ebf91",

    color: "white",

    border: "none",

    borderRadius: "8px",

    fontSize: "16px",

    cursor: "pointer",

  },

  text: {

    marginTop: "15px",

  },

  link: {

    color: "#2ebf91",

    textDecoration: "none",

    fontWeight: "bold",

  },

};

export default Login;