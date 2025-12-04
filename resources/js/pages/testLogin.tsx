import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react"; // ✅ for Laravel navigation
import { usePage } from "@inertiajs/react";

// ====================================================
// CSS-IN-JS (clean + same design)
// ====================================================
const loginStyles = `
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed;
  color: #333;
}
html {
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed;
}
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.login-box {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.back-home {
  position: absolute;
  top: 20px;
  left: 25px;
  color: #555;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95em;
}
.back-home:hover { text-decoration: underline; color: #333; }
.logo-top {
  display: block;
  margin: 5px auto 8px;
  width: 80px;
  height: auto;
  object-fit: contain;
}
.login-box h2 {
  margin: 5px 0 30px;
  color: #222;
  font-weight: 600;
  font-size: 2em;
}
.form-content {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.input-wrapper { position: relative; width: 100%; }
input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
}
input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 1px #4CAF50;
}
.toggle-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
  width: 20px;
  height: 20px;
}
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.9em;
  margin-top: -5px;
  margin-bottom: 10px;
}
.form-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  cursor: pointer;
}
.form-options a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 500;
}
.form-options a:hover { text-decoration: underline; }
.login-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
}
.login-btn:hover { background-color: #3b8c3c; }
.footer-links {
  margin-top: 25px;
  font-size: 0.95em;
  color: #666;
}
.footer-links a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
}
.footer-links a:hover { text-decoration: underline; }
`;

export default function TestLogin() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!document.getElementById("login-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "login-styles";
      styleTag.innerHTML = loginStyles;
      document.head.appendChild(styleTag);
    }
  }, []);
  const { errors } = usePage().props as any;


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    router.post("/login-check", { email, password });
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <Link href="/test-home" className="back-home">← Back to Home</Link>
        <img src="/NutriMatch Logo.png" alt="NutriMatch Logo" className="logo-top" />
        <h2>Sign In</h2>

        <form className="form-content" onSubmit={handleLogin}>
          <div className="input-wrapper">
            <input name="email"
              type="email"
              placeholder="Email"
              required />
            {errors?.email && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
                {errors.email}
              </div>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            {errors?.password && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
                {errors.password}
              </div>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="toggle-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.03-2.87 3.18-5.26 6-6.82M1 1l22 22" />
                  <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-6.03" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password</a>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="footer-links">
          <p>
            Don’t have an account? <Link href="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
