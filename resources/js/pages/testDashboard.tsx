import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "@inertiajs/react"; // ✅ use Inertia Link for Laravel routing

// ====================================================
// CSS-IN-JS — Injects styles dynamically
// ====================================================
const dashboardStyles = `
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed;
  color: #333;
  overflow-x: hidden;
}
html {
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed;
}
.dashboard-navbar {
  width: 95%;
  max-width: 1200px;
  margin: 20px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  box-sizing: border-box;
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
}
.search-bar input:focus {
  outline: none;
  border-color: #4CAF50;
}
.search-btn {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
  border-left: none;
  padding: 10px 30px;
  border-radius: 0 8px 8px 0;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95em;
  transition: background 0.3s ease;
}
.search-btn:hover {
  background-color: #3b8c3c;
}
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
.dashboard-container {
  max-width: 1200px;
  margin: 30px auto;
  /* background-color: #ffffff; */
  /* box-shadow: 0 6px 15px rgba(0,0,0,0.12); */
  /* border-radius: 15px; */
  /* padding: 40px; */
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 30px;
}
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

/* ⭐ RECOMMENDED RECIPES SECTION ⭐ */
.recommend-section {
  max-width: 1200px;
  margin: 30px auto;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
}
.recommend-section h2 {
  font-size: 1.4em;
  font-weight: 700;
  margin-bottom: 20px;
}

/* GRID */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 25px;
  row-gap: 25px;
}

/* CARD STYLE */
.recipe-card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-3px);
}

/* IMAGE STYLE */
.recipe-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* CONTENT STYLE */
.recipe-content {
  padding: 20px;
}

.recipe-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.05em;
}

.recipe-content p {
  margin: 0 0 12px 0;
  font-size: 0.9em;
  color: #555;
}

/* BUTTON LAYOUT */
.recipe-btns {
  display: flex;
  gap: 10px;
}

/* BUTTON COLORS */
.btn-view {
  background-color: #e6ffe6;
  color: #3b8c3c;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}

.btn-save {
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-box {
  background: white;
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
`;

const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      color: '#333',
      padding: '15px 25px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 500,
      border: '1px solid #e0e0e0',
      animation: 'slideIn 0.3s ease-out'
    }}>
      ✅ {message}
      <style>{`
        @keyframes slideIn {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default function TestDashboard({ savedRecipes = [], user }: { savedRecipes?: any[], user?: any }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [detected, setDetected] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const isSaved = (recipeId: number) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const toggleSave = (recipeId: number) => {
    if (!user) {
      // Redirect to login if not logged in
      router.visit('/test-login');
      return;
    }

    const isCurrentlySaved = isSaved(recipeId);
    router.post('/recipes/toggle-save', { recipe_id: recipeId }, {
      preserveScroll: true,
      onSuccess: () => {
        if (!isCurrentlySaved) {
          setNotification("Recipe successfully added!");
        } else {
          setNotification("Recipe successfully removed!");
        }
      },
      onError: (errors) => {
        console.error("Save failed:", errors);
        setNotification("Failed to save recipe. Please try again.");
      }
    });
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<{ recipe_name: string; image_url: string }[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    fetch("/recommended")
      .then(res => res.json())
      .then(data => setRecommended(data));
  }, []);



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

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setTimeout(
      () => setDetected(["Tomato", "Onion", "Bell Pepper", "Garlic"]),
      1000
    );
  };
  const handleTyping = async (e: any) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/search-suggest?q=${value}`);
    const data = await response.json();
    setSuggestions(data);
  };

  const selectSuggestion = (text: string) => {
    setQuery(text);
    setShowSuggest(false);
    handleSearch();
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };


  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggest(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <Link href="/" className="dashboard-logo">
          <img src="/NutriMatch Logo.png" alt="NutriMatch Logo" />
          NutriMatch
        </Link>
        <div className="search-container">
          <div ref={searchRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={handleTyping}
                onFocus={() => setShowSuggest(true)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>

            {/* 🔽 Suggestion Dropdown */}
            {showSuggest && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "100%",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  listStyle: "none",
                  padding: "0",
                  zIndex: 50,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  marginTop: "5px"
                }}
              >
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => selectSuggestion(s.recipe_name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f1f1",
                      gap: "10px",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <img
                      src={s.image_url || "https://via.placeholder.com/40"}
                      alt={s.recipe_name}
                      style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }}
                    />
                    <span style={{ fontWeight: 500, color: "#333" }}>{s.recipe_name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="nav-links">
          <Link href="/dashboard" className="active">
            Home
          </Link>
          <Link href="/test-profile">Profile</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Upload Section */}
          <div className="upload-card">
            <h2>Upload and Detect Ingredients</h2>
            {!preview ? (
              <div className="upload-box">
                <p>Upload your food image to detect ingredients automatically.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => fileRef.current?.click()}
                >
                  Upload Image
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            ) : (
              <div className="preview-container">
                <img src={preview} alt="Uploaded" className="preview-img" />
                <div style={{ flex: 1 }}>
                  <h3>Detected Ingredients:</h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    {detected.map((i) => (
                      <span key={i} className="badge">
                        {i}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-outline">Add Ingredients</button>
                    <button className="btn btn-primary">View Recipes</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tracker Section */}
          <div className="tracker-card">
            <h3 className="tracker-title">Calories Tracker</h3>
            <div className="tracker-ring">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
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
              <div className="meal-item">
                <span>🥞 French Toast</span>
                <span>310 kcal</span>
              </div>
              <div className="meal-item">
                <span>🥗 Pasta Salad</span>
                <span>320 kcal</span>
              </div>
              <div className="meal-item">
                <span>🍎 Fruit Snack</span>
                <span>180 kcal</span>
              </div>
            </div>
            <button className="track-meal-btn">+ Track New Meal</button>
          </div>
        </div>
      </div>

      {/* ⭐ UPDATED Recommended Recipes (STYLE SAME AS SAVED) ⭐ */}
      <section className="recommend-section">
        <h2>Recommended Recipes</h2>
        <div className="recipe-grid">
          {recommended.map((r: any, i) => (
            <div key={i} className="recipe-card">
              <img
                src={r.image_url || "https://via.placeholder.com/400x200/ccc/888?text=Food"}
                alt={r.recipe_name}
              />
              <div className="recipe-content">
                <h3>{r.recipe_name}</h3>
                <p>{r.category} • {r.nutrition_calories} kcal</p>
                <div className="recipe-btns">
                  <button className="btn-view">View Recipe</button>
                  <button
                    className={isSaved(r.id) ? "btn-save" : "btn-save"} // You might want a different class for unsave, e.g. btn-remove
                    style={isSaved(r.id) ? { backgroundColor: '#ffe6e6', color: '#c53030' } : {}}
                    onClick={() => toggleSave(r.id)}
                  >
                    {isSaved(r.id) ? 'Unsave' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔍 SEARCH RESULTS SECTION */}
      {/* 🔍 SEARCH RESULTS MODAL */}
      {results.length > 0 && (
        <div className="modal-overlay" onClick={() => setResults([])}>
          <div className="modal-box" style={{ width: 'auto', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Search Results</h2>
              <button
                onClick={() => setResults([])}
                style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', color: '#666' }}
              >
                ✖
              </button>
            </div>

            <div className="recipe-grid" style={{ gridTemplateColumns: `repeat(${Math.min(results.length, 3)}, 1fr)` }}>
              {results.map((r, i) => (
                <div key={i} className="recipe-card">
                  <img
                    src={r.image_url || "https://via.placeholder.com/400x200/ccc/888?text=Food"}
                    alt={r.recipe_name}
                  />
                  <div className="recipe-content">
                    <h3>{r.recipe_name}</h3>
                    <p><strong>Category:</strong> {r.category}</p>
                    <p><strong>Calories:</strong> {r.nutrition_calories} kcal</p>
                    <div className="recipe-btns">
                      <button className="btn-view">View Recipe</button>
                      <button
                        className={isSaved(r.id) ? "btn-save" : "btn-save"}
                        style={isSaved(r.id) ? { backgroundColor: '#ffe6e6', color: '#c53030' } : {}}
                        onClick={() => toggleSave(r.id)}
                      >
                        {isSaved(r.id) ? 'Unsave' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



    </>
  );
}
