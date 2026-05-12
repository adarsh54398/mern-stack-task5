import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.msg);

      window.location.href = "/";

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          📝 Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) =>
            setName(e.target.value)
          }
          style={styles.input}
        />

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
          onClick={handleRegister}
          style={styles.button}
        >
          Register
        </button>

        <p style={styles.text}>
          Already have an account?
        </p>

        <a
          href="/"
          style={styles.link}
        >
          Login Here
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
      "linear-gradient(to right, #ff9966, #ff5e62)",

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

    background: "#ff5e62",

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

    color: "#ff5e62",

    textDecoration: "none",

    fontWeight: "bold",

  },

};

export default Register;