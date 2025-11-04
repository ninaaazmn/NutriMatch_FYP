import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ===============================================
// GAYA CSS-IN-JS UNTUK HALAMAN PROFIL (TELAH DIKEMAS KINI)
// ===============================================
const profileStyles = `
/* Gunakan Latar Belakang yang sama dari Home.jsx */
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  /* LATAR BELAKANG BARU */
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  color: #333;
  overflow-x: hidden;
}

#root {
    min-height: 100vh;
}

/* ========== NAVBAR (DIUBAH SUAI) ========== */
.profile-navbar {
  max-width: 1200px;
  margin: 20px auto 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between; /* Logo (kiri), Search (tengah), Links (kanan) */
  align-items: center;
  padding: 18px 40px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  box-sizing: border-box; /* Pastikan padding tidak ubah lebar */
}

.profile-logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #333;
  font-size: 1.5em;
  text-decoration: none;
}

.profile-logo img {
  width: 40px; /* Saiz lebih kecil seperti dalam imej */
  height: 40px;
  margin-right: 10px;
}

/* === CSS UNTUK KOTAK SEARCH + BUTANG === */
.search-container {
  display: flex; /* Letak bar dan butang sebelah-menyebelah */
  margin: 0 20px; /* Jarak dari logo dan links */
  flex-grow: 1; /* Cuba ambil ruang di tengah */
  justify-content: center; /* Pusatkan di tengah jika ruang berlebihan */
}

.search-bar {
  position: relative;
  width: 100%; /* Lebar search bar */
  max-width: 300px; /* Had lebar */
}

.search-bar input {
  width: 100%;
  padding: 10px 15px; 
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px; 
  background-color: #f7f7f7;
  border-right: none; 
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 0.95em;
  box-sizing: border-box; 
}
.search-bar input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 1px #4CAF50;
  z-index: 2;
  position: relative;
}

/* Stail butang search baru */
.search-btn {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50; /* Samakan saiz border dgn input */
  border-left: none;         /* Bersambung dgn input */
  padding: 10px 30px; /* Dilebarkan lagi kepada 30px */
  border-radius: 0 8px 8px 0; /* Bucu kiri rata */
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Poppins', Arial, sans-serif; /* Samakan font */
  font-size: 0.95em;
  white-space: nowrap; /* paksa satu baris */
  box-sizing: border-box; 
}
.search-btn:hover {
  background-color: #3b8c3c;
}


/* === CSS UNTUK LINKS & ANIMASI === */
.profile-nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1em;
  position: relative; /* Perlu untuk animasi garis bawah */
  padding-bottom: 5px; /* Ruang untuk garis bawah */
}

/* Garis bawah (sembunyi) */
.profile-nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4CAF50; /* Warna hijau */
  transform: scaleX(0); /* Sembunyikan */
  transform-origin: center;
  transition: transform 0.3s ease-out;
}

/* Animasi bila hover (HANYA jika BUKAN 'active') */
.profile-nav-links a:not(.active):hover::after {
  transform: scaleX(1); /* Tunjukkan */
}

/* Stail untuk link yang aktif (Profile) */
.profile-nav-links a.active {
  color: #000;
  font-weight: 700; /* Guna 700 untuk BOLD */
}


/* ========== KANDUNGAN PROFIL (Dari Imej) ========== */
.profile-container {
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  gap: 30px;
  align-items: flex-start; /* Pastikan lajur bermula dari atas */
}

/* Sidebar Kiri */
.profile-sidebar {
  flex: 0 0 300px; /* Lebar tetap */
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content; /* Supaya ketinggian mengikut kandungan */
}

.sidebar-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 15px;
}

.sidebar-user img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.sidebar-user h3 {
  margin: 0 0 5px 0;
  font-size: 1.2em;
}

.sidebar-user p {
  margin: 0;
  font-size: 0.9em;
  color: #888;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 5px;
}

/* Tukar 'a' kepada 'button' untuk elak navigasi */
.sidebar-nav button {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  border-radius: 10px;
  transition: background 0.2s ease;
  
  /* Reset stail button */
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: 1em;
  cursor: pointer;
}

.sidebar-nav button:hover, .sidebar-nav button.active {
  background-color: #f4f4f4;
  color: #222;
}

.sidebar-nav button.logout {
  color: #e53e3e;
}

/* Kandungan Kanan */
.profile-content {
  flex-grow: 1;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  min-height: 400px;
}

.profile-content h2 {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 0 30px 0;
}

.profile-content h2 img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.profile-form .form-group {
  margin-bottom: 20px;
}

.profile-form label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.95em;
}

.profile-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  background-color: #f9f9f9;
  box-sizing: border-box; /* Pastikan padding tidak menjejaskan lebar */
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  float: right; /* Letak di sebelah kanan */
  margin-top: 10px;
}

.save-btn:hover {
  background-color: #3b8c3c;
}

/* Stail untuk Edit Preferences */
.pref-group {
  margin-bottom: 30px;
}
.pref-group h3 {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 15px;
}
.pref-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.pref-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.pref-option.selected {
  border-color: #4CAF50;
  background-color: #f0f9f0;
  box-shadow: 0 0 0 1px #4CAF50;
}
.pref-option input[type="radio"],
.pref-option input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #4CAF50;
}
.pref-option label {
  margin: 0;
  font-weight: 500;
}

/* ========== STYLES UNTUK LOGOUT MODAL ========== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 400px;
}

.modal-box h2 {
  font-size: 1.6em;
  font-weight: 700;
  color: #333;
  margin: 0 0 30px 0;
}

.modal-buttons {
  display: flex;
  gap: 15px;
}

.modal-buttons button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn-cancel {
  background-color: #eee;
  color: #555;
}
.modal-btn-cancel:hover { background-color: #ddd; }

.modal-btn-logout {
  background-color: #fecaca; /* Merah jambu */
  color: #dc2626; /* Merah */
}
.modal-btn-logout:hover { background-color: #fca5a5; }

/* === 1. CSS LAMA UNTUK KAD SEJARAH (HistoryView) === */
.recipe-grid {
  display: flex;
  flex-direction: column; 
  gap: 25px;
}

.recipe-card {
  display: flex; 
  gap: 20px;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 15px;
}

.recipe-card img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.recipe-card-content {
  flex-grow: 1;
}

.recipe-card-content h3 {
  margin: 0 0 5px 0;
}

.recipe-card-content p {
  font-size: 0.9em;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.recipe-tags {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.recipe-tags span {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
}

.tag-view {
  background-color: #e6ffe6;
  color: #3b8c3c;
}


/* === 2. CSS BARU UNTUK SAVED RECIPE (DI LUAR) === */
.saved-recipe-section {
  max-width: 1200px; /* Lebar sama dengan gabungan */
  margin: 30px auto; /* Duduk di bawah, berpusat */
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  box-sizing: border-box;
}

.saved-recipe-section h2 {
  margin: 0 0 25px 0;
  font-size: 1.8em;
}

.saved-recipe-grid {
  display: grid; /* Guna grid lebih baik */
  grid-template-columns: repeat(2, 1fr); /* 2 kad sebelah-menyebelah */
  gap: 25px;
}

.saved-recipe-card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.saved-recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.saved-recipe-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.saved-recipe-content h3 {
  margin: 0 0 10px 0;
}

.saved-recipe-content p {
  font-size: 0.9em;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1; /* Tolak butang ke bawah */
}

.recipe-card-tags {
    display: flex;
    gap: 8px;
    margin-bottom: 15px; /* Jarak antara tag dan perenggan */
    flex-wrap: wrap;
}

.recipe-card-tags span {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 500;
}

/* Warna Tag (mengikut gambar) */
.tag-protein { background-color: #ffe6e6; color: #c53030; }
.tag-veg { background-color: #e6ffe6; color: #3b8c3c; }
.tag-meat { background-color: #e6f7ff; color: #2a6f97; }
.tag-time { background-color: #f0f0f0; color: #555; }

.recipe-card-buttons {
  display: flex;
  gap: 10px;
}

.recipe-card-buttons button {
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s ease;
  font-family: 'Poppins', Arial, sans-serif;
}

.btn-view {
  background-color: #e6ffe6;
  color: #3b8c3c;
}
.btn-view:hover {
  background-color: #c6f5cc;
}

.btn-remove {
  background-color: #ffe6e6;
  color: #c53030;
}
.btn-remove:hover {
  background-color: #fecaca;
}

/* Responsif untuk seksyen baru */
@media (max-width: 1200px) {
    .profile-navbar, .profile-container, .saved-recipe-section {
        width: 95%; /* Guna peratusan untuk skrin kecil sikit */
    }
}

@media (max-width: 992px) {
    .profile-container {
        flex-direction: column;
    }
    .profile-sidebar {
        width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 768px) {
    .saved-recipe-grid {
        grid-template-columns: 1fr; /* 1 kad setiap baris */
    }
    .profile-navbar {
        flex-direction: column;
        gap: 15px;
    }
    .profile-nav-links {
        width: 100%;
        justify-content: space-around;
    }
    .search-container {
        width: 100%;
    }
    .search-bar {
        max-width: none;
    }
}
`;

// ===============================================
// PAPARAN KANDUNGAN KANAN (DIASINGKAN)
// ===============================================

// Paparan 1: Borang Profil (HANYA BORANG)
const ProfileFormView = () => (
  <>
    <form className="profile-form">
      <h2>
        <img src="https://via.placeholder.com/50" alt="Avatar" />
        Raihanah
      </h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue="Raihanah" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email account</label>
        <input
          type="email"
          id="email"
          defaultValue="raihanah1234@gmail.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" defaultValue="********" />
      </div>
      <button type="button" className="save-btn">
        Save changes
      </button>
    </form>

    {/* Bahagian "Saved Recipe" TELAH DIPINDAHKAN KELUAR */}
  </>
);

// Paparan 2: Edit Preferences
const EditPreferencesView = () => {
  // Anda boleh 'useState' di sini untuk menguruskan pilihan
  const [diet, setDiet] = useState("No specific diet");
  const [allergies, setAllergies] = useState(["Shellfish"]);
  const [cuisine, setCuisine] = useState("American");

  return (
    <>
      <h2>Edit Preferences</h2>
      <form>
        <div className="pref-group">
          <h3>Diet</h3>
          <div className="pref-options">
            {["No specific diet", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo"].map(item => (
              <div key={item} className={`pref-option ${diet === item ? 'selected' : ''}`} onClick={() => setDiet(item)}>
                <input type="radio" name="diet" value={item} checked={diet === item} readOnly />
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-group">
          <h3>Allergies or intolerances</h3>
          <div className="pref-options">
            {["Shellfish", "Dairy", "Nuts", "Eggs", "Soy", "Gluten"].map(item => (
              <div key={item} className={`pref-option ${allergies.includes(item) ? 'selected' : ''}`} onClick={() => setAllergies(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item])}>
                <input type="checkbox" name="allergies" value={item} checked={allergies.includes(item)} readOnly />
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-group">
          <h3>Cuisine</h3>
          <div className="pref-options">
            {["Indian", "Mexican", "American", "Asian", "Mediterranean", "Italian"].map(item => (
              <div key={item} className={`pref-option ${cuisine === item ? 'selected' : ''}`} onClick={() => setCuisine(item)}>
                <input type="radio" name="cuisine" value={item} checked={cuisine === item} readOnly />
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="button" className="save-btn">Save changes</button>
      </form>
    </>
  );
};

// Paparan 3: History (Guna stail kad asal)
const HistoryView = () => (
  <>
    <h2>History</h2>
    <div className="recipe-grid"> {/* Ini guna stail .recipe-grid asal (flex-direction: column) */}
      {/* Kad Resepi 1 */}
      <div className="recipe-card"> {/* Ini guna stail .recipe-card asal (flex-direction: row) */}
        <img src="https://via.placeholder.com/150x100/ccc/888?text=Aglio+Olio" alt="Aglio Olio" />
        <div className="recipe-card-content">
          <h3>Aglio Olio</h3>
          <p>A deliciously simple Italian dish of fresh garlic, olive oil, and Parmesan...</p>
          <div className="recipe-tags">
            <span className="tag-view">View Recipe</span>
          </div>
        </div>
      </div>
      {/* Tambah lagi kad di sini jika perlu */}
    </div>
  </>
);

// ===============================================
// MODAL LOGOUT
// ===============================================
const LogoutModal = ({ onClose, onConfirm }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h2>Are Sure You Want To Log Out?</h2>
      <div className="modal-buttons">
        <button className="modal-btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-btn-logout" onClick={onConfirm}>
          Log Out
        </button>
      </div>
    </div>
  </div>
);

// ===============================================
// KOMPONEN UTAMA PROFIL
// ===============================================
export default function Profile() {
  const navigate = useNavigate();
  
  // State untuk mengawal paparan kanan
  const [activeView, setActiveView] = useState('profile'); // 'profile', 'preferences', 'history'
  
  // State untuk mengawal modal logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Injeksi gaya CSS-in-JS
  useEffect(() => {
    if (!document.getElementById("profile-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "profile-styles";
      styleTag.innerHTML = profileStyles;
      document.head.appendChild(styleTag);
    }
    // Set body style
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Poppins', Arial, sans-serif";
  }, []);

  // Fungsi untuk memaparkan kandungan kanan secara dinamik
  const renderView = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileFormView />;
      case 'preferences':
        return <EditPreferencesView />;
      case 'history':
        return <HistoryView />;
      default:
        return <ProfileFormView />;
    }
  };
  
  // Fungsi untuk handle logout
  const handleLogout = () => {
    setShowLogoutModal(false);
    // Tambah logik logout sebenar di sini (cth: clear token)
    console.log("Logging out...");
    navigate("/"); // <-- Baris ini yang hantar pengguna ke Home
  };
  
  return (
    <>
      {/* 1. NAVBAR */}
      <nav className="profile-navbar">
        <Link to="/" className="profile-logo">
          <img src="/NutriMatch Logo.png" alt="NutriMatch Logo" />
          NutriMatch
        </Link>
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search recipes..." />
          </div>
          <button className="search-btn">
            Search
          </button>
        </div>
        <div className="profile-nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/profile" className="active">
            Profile
          </Link>
        </div>
      </nav>

      {/* 2. KANDUNGAN PROFIL (2 Lajur) */}
      <div className="profile-container">
        {/* Lajur Kiri: Sidebar */}
        <aside className="profile-sidebar">
          <div className="sidebar-user">
            <img src="https://via.placeholder.com/70" alt="Avatar" />
            <h3>Raihanah</h3>
            <p>raihanah1234@gmail.com</p>
          </div>
          <ul className="sidebar-nav">
            <li>
              <button 
                className={activeView === 'profile' ? 'active' : ''}
                onClick={() => setActiveView('profile')}
              >
                <span>👤</span> My profile
              </button>
            </li>
            <li>
              <button
                className={activeView === 'preferences' ? 'active' : ''}
                onClick={() => setActiveView('preferences')}
              >
                <span>✏️</span> Edit preferences
              </button>
            </li>
            <li>
              <button
                className={activeView === 'history' ? 'active' : ''}
                onClick={() => setActiveView('history')}
              >
                <span>🔄</span> View history
              </button>
            </li>
            <li>
              <button className="logout" onClick={() => setShowLogoutModal(true)}>
                <span>➡️</span> Log out
              </button>
            </li>
          </ul>
        </aside>

        {/* Lajur Kanan: Kandungan Dinamik */}
        <main className="profile-content">
          {renderView()}
        </main>
      </div>
      
      {/* 3. BAHAGIAN "SAVED RECIPE" (BARU) */}
      <section className="saved-recipe-section">
        <h2>Saved Recipe</h2>
        <div className="saved-recipe-grid">
          {/* Kad 1 */}
          <div className="saved-recipe-card">
            <img src="https://via.placeholder.com/400x200/ccc/888?text=Fried+Rice" alt="Fried Rice" />
            <div className="saved-recipe-content">
              <h3>Fried Rice</h3>
              <div className="recipe-card-tags">
                <span className="tag-protein">High Protein</span>
                <span className="tag-veg">Vegetarian</span>
                <span className="tag-time">25 min</span>
              </div>
              <p>A wholesome and hearty stir-fry dish made with rice, scrambled eggs, carrots, peas, and green onions, seasoned with light soy sauce and sesame oil.</p>
              <div className="recipe-card-buttons">
                <button className="btn-view">View Recipe</button>
                <button className="btn-remove">Remove</button>
              </div>
            </div>
          </div>
          
          {/* Kad 2 */}
          <div className="saved-recipe-card">
            <img src="https://via.placeholder.com/400x200/ccc/888?text=Club+Sandwich" alt="Club Sandwich" />
            <div className="saved-recipe-content">
              <h3>Club Sandwich</h3>
              <div className="recipe-card-tags">
                <span className="tag-protein">High Protein</span>
                <span className="tag-meat">Contains meat</span>
                <span className="tag-time">15 min</span>
              </div>
              <p>A savory sandwich layered with mayo, sliced salami, a fried egg, fresh lettuce and tomato on whole grain bread.</p>
              <div className="recipe-card-buttons">
                <button className="btn-view">View Recipe</button>
                <button className="btn-remove">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODAL LOGOUT (Hanya muncul jika showLogoutModal == true) */}
      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}