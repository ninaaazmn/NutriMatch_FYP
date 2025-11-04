import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ====================================================
// CSS in JS — Sama gaya & lebar macam Profile.jsx
// ====================================================
const dashboardStyles = `
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  color: #333;
  overflow-x: hidden;
}

/* NAVBAR — sama macam Profile */
.dashboard-navbar {
  width: 95%;
  max-width: 1200px;
  margin: 20px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  box-sizing: border-box; /* ✅ penting supaya padding tak ubah lebar */
}


.dashboard-logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #333;
  font-size: 1.5em;
  text-decoration: none;
}
.dashboard-logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
/* === Search Section (fixed width behaviour) === */
.search-container {
  display: flex;
  margin: 0 20px;
  flex-grow: 1;
  justify-content: center;
}

.search-bar {
  display: flex;
  width: 100%;
  max-width: 300px;
}

.search-bar input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 8px 0 0 8px;
  background-color: #f7f7f7;
  font-size: 0.95em;
  box-sizing: border-box;
}

.search-bar input:focus {
  outline: none;
  border-color: #4CAF50;
}

.search-btn {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
  border-left: none; /* ✅ consistent */
  padding: 10px 30px;
  border-radius: 0 8px 8px 0;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95em;
  box-sizing: border-box; /* ✅ maintain width */
  transition: background 0.3s ease;
}
.search-btn:hover {
  background-color: #3b8c3c;
}

/* NAVLINKS dengan animasi hover */
.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}
.nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1em;
  position: relative;
  padding-bottom: 5px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4CAF50;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease-out;
}
.nav-links a:not(.active):hover::after {
  transform: scaleX(1);
}
.nav-links a.active {
  color: #000;
  font-weight: 700;
}

/* CONTAINER */
.dashboard-container {
  max-width: 1200px;
  margin: 30px auto;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  padding: 40px;
  box-sizing: border-box;
}

/* GRID dua lajur */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 30px;
}

/* Upload section */
.upload-card {
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 30px;
  background: #fff;
}
.upload-box {
  border: 2px dashed #aaa;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  background-color: #f9f9f9;
}
.preview-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.preview-img {
  width: 240px;
  height: 170px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.badge {
  background-color: #e6ffe6;
  color: #3b8c3c;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 500;
}
.btn {
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Poppins', Arial, sans-serif;
  transition: all 0.2s ease;
}
.btn-primary { background-color: #4CAF50; color: white; }
.btn-primary:hover { background-color: #3b8c3c; }
.btn-outline {
  background-color: white;
  color: #4CAF50;
  border: 1px solid #4CAF50;
}
.btn-outline:hover { background-color: #f4fff4; }

/* Tracker */
.tracker-card {
  border: 1px solid #eee;
  border-radius: 15px;
  background: #fff;
  padding: 25px;
}
.tracker-title {
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
}
.tracker-ring {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 20px;
}
.tracker-ring svg { transform: rotate(-90deg); }
.tracker-ring circle { fill: none; stroke-width: 10; }
.tracker-ring .bg { stroke: #e5e7eb; }
.tracker-ring .progress {
  stroke: url(#gradient);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.4s;
}
.tracker-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tracker-meals h4 { font-size: 1em; margin-bottom: 8px; }
.meal-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  margin-bottom: 6px;
  color: #555;
}
.track-meal-btn {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px;
}
.track-meal-btn:hover { background-color: #3b8c3c; }

/* Recommended recipes */
/* === Recommended Recipes - Static Grid (No Movement) === */
.recommend-section {
  max-width: 1200px;
  margin: 30px auto;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  padding: 40px;
  box-sizing: border-box;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ 3 column static */
  column-gap: 25px; /* gap antara column */
  row-gap: 25px; /* kalau ada row baru */
  justify-content: space-between;
}

.recipe-card {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  background: #fff;
  transition: transform 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-3px);
}

.recipe-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.recipe-content { padding: 20px; }
.recipe-btns { display: flex; gap: 10px; }
.btn-view { background-color: #e6ffe6; color: #3b8c3c; }
.btn-save { background-color: #ffe6e6; color: #c53030; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000;
}
.modal-box {
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
}
.checkbox-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
}
.checkbox-pill input { accent-color: #4CAF50; }
`;

export default function Dashboard() {
  const [preview, setPreview] = useState(null);
  const [detected, setDetected] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [extras, setExtras] = useState(new Set());
  const fileRef = useRef();

  const goal = 1900;
  const consumed = 1425;
  const progress = Math.min(100, Math.round((consumed / goal) * 100));

  useEffect(() => {
    if (!document.getElementById("dashboard-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "dashboard-style";
      styleTag.innerHTML = dashboardStyles;
      document.head.appendChild(styleTag);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setTimeout(() => setDetected(["Tomato", "Onion", "Bell Pepper", "Garlic"]), 1000);
  };

  const handleAddExtras = () => {
    setDetected((prev) => [...new Set([...prev, ...Array.from(extras)])]);
    setExtras(new Set());
    setShowAdd(false);
    setShowSuccess(true);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <Link to="/" className="dashboard-logo">
          <img src="/NutriMatch Logo.png" alt="NutriMatch Logo" />
          NutriMatch
        </Link>
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search recipes..." />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="active">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      {/* Main container */}
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Upload Section */}
          <div className="upload-card">
            <h2>Upload and Detect Ingredients</h2>
            {!preview ? (
              <div className="upload-box">
                <p>Upload your food image to detect ingredients automatically.</p>
                <button className="btn btn-primary" onClick={() => fileRef.current.click()}>
                  Upload Image
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </div>
            ) : (
              <div className="preview-container">
                <img src={preview} alt="Uploaded" className="preview-img" />
                <div style={{ flex: 1 }}>
                  <h3>Detected Ingredients:</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                    {detected.map((i) => (
                      <span key={i} className="badge">{i}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-outline" onClick={() => setShowAdd(true)}>Add Ingredients</button>
                    <button className="btn btn-primary" onClick={() => setShowRecipes(true)}>View Recipes</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Calories Tracker */}
          <div className="tracker-card">
            <h3 className="tracker-title">Calories Tracker</h3>
            <div className="tracker-ring">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2af598" />
                  </linearGradient>
                </defs>
                <circle className="bg" cx="50" cy="50" r="42" />
                <circle
                  className="progress"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - progress / 100)}
                />
              </svg>
              <div className="tracker-center">
                <strong>{consumed} kcal</strong>
                <small>{goal - consumed} left</small>
              </div>
            </div>
            <div className="tracker-meals">
              <h4>Today's Meals</h4>
              <div className="meal-item"><span>🥞 French Toast</span><span>310 kcal</span></div>
              <div className="meal-item"><span>🥗 Pasta Salad</span><span>320 kcal</span></div>
              <div className="meal-item"><span>🍎 Fruit Snack</span><span>180 kcal</span></div>
            </div>
            <button className="track-meal-btn">+ Track New Meal</button>
          </div>
        </div>
      </div>

      {/* Recommended Recipes */}
      <section className="recommend-section">
        <h2>Recommended Recipes</h2>
        <div className="recipe-grid">
          {[
            { title: "Fried Rice", desc: "Simple stir-fry with veggies and egg." },
            { title: "Club Sandwich", desc: "Layered sandwich with lettuce & tomato." },
            { title: "Fruit Yogurt Parfait", desc: "Light and creamy yogurt dessert." },
          ].map((r, i) => (
            <div key={i} className="recipe-card">
              <img src="https://via.placeholder.com/400x200/ccc/888?text=Food" alt={r.title} />
              <div className="recipe-content">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className="recipe-btns">
                  <button className="btn-view">View Recipe</button>
                  <button className="btn-save">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
