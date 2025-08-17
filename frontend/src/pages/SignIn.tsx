import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // ✅ make sure firebaseConfig.ts exists
import logo from "../assests/AI.jpeg";
import "./Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Signed in successfully!");
      // 👉 optionally navigate to dashboard/home
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Logo */}
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: "80px", marginBottom: "15px", borderRadius: "50%" }} 
        />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Sign In</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

