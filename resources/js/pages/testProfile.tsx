import React, { useEffect, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";

// ===============================================
// FULL CSS
// ===============================================
const profileStyles = `
/* Background */
body {
  margin: 0;
  font-family: 'Helvetica', Arial, sans-serif;
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed; /* Ensure green stays connected */
  color: #333;
  overflow-x: hidden;
}
html {
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  background-attachment: fixed;
}
#root {
  min-height: 100vh;
}

/* NAVBAR */
.profile-navbar {
  max-width: 1200px;
  margin: 20px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background-color: rgba(255, 255, 255, 0.9); /* Glassmorphism */
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  box-sizing: border-box;
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
  position: relative;
  width: 100%;
  max-width: 300px;
  display: flex;
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
}
.search-bar input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 1px #4CAF50;
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
  transition: background 0.3s ease;
  font-size: 0.95em;
}
.search-btn:hover {
  background-color: #3b8c3c;
}
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
  position: relative;
  padding-bottom: 5px;
}
.profile-nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4CAF50;
  transform: scaleX(0);
  transition: transform 0.3s ease-out;
}
.profile-nav-links a:not(.active):hover::after {
  transform: scaleX(1);
}
.profile-nav-links a.active {
  color: #000;
  font-weight: 700;
}

/* PROFILE LAYOUT */
.profile-container {
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.profile-sidebar {
  flex: 0 0 300px;
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
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
  font-weight: 700;
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
.sidebar-nav button {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  color: #555;
  font-weight: 500;
  border-radius: 10px;
  transition: background 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: 1em;
  cursor: pointer;
}
.sidebar-nav button:hover,
.sidebar-nav button.active {
  background-color: #f4f4f4;
  color: #222;
}
.sidebar-nav button.logout {
  color: #e53e3e;
}

.profile-content {
  flex-grow: 1;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  min-height: 400px;
}

/* Section titles (My Profile, Edit Preferences, History) */
.profile-content h2 {
  font-size: 1.4em;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* PROFILE FORM */
.profile-form {
  max-width: 500px;
}
.profile-form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.profile-form-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.profile-name {
  font-weight: 700;
  font-size: 1.2em;
}
.profile-form .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.profile-form label {
  font-size: 0.9em;
  margin-bottom: 5px;
  font-weight: 500; /* label normal, bukan bold besar sangat */
  color: #333;
}
.profile-form input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: 0.95em;
}
.profile-form input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76,175,80,0.15);
}
.save-btn {
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}
.save-btn:hover {
  background-color: #3b8c3c;
}

/* EDIT PREFERENCES – SAME STYLE AS REGISTER PREF BOXES */
.pref-group {
  margin-bottom: 20px;
  flex-basis: 100%;
}
.pref-group h3 {
  font-size: 0.95em;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
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
  background-color: #fff;
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
.pref-option span {
  margin: 0;
  font-weight: 500;
}

/* HISTORY */
.history-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
.history-item {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}
.history-item img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
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
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 400px;
}
.logout-modal-box {
  background: white;
  padding: 40px 50px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 90%;
}
.modal-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
.modal-buttons button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
}
.modal-btn-cancel {
  background-color: #eee;
  color: #555;
}
.modal-btn-logout {
  background-color: #fecaca;
  color: #dc2626;
}

/* SAVED RECIPES – CARD GRID LIKE DASHBOARD RECOMMENDED */
.saved-recipe-section {
  max-width: 1200px;
  margin: 30px auto;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
}
.saved-recipe-section h2 {
  font-size: 1.4em;
  font-weight: 700;
  margin-bottom: 20px;
}
.saved-recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  justify-content: center;
}
.saved-recipe-grid::-webkit-scrollbar {
  height: 8px;
}
.saved-recipe-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.saved-recipe-grid::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
.saved-recipe-grid::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
.saved-recipe-card {
  min-width: 300px; /* Fixed width for cards */
  flex: 0 0 auto;   /* Prevent shrinking */
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  background: #fff;
  transition: transform 0.2s ease;
}
.saved-recipe-card:hover {
  transform: translateY(-3px);
}
.saved-recipe-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.saved-recipe-content {
  padding: 20px;
}
.saved-recipe-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.05em;
}
.saved-recipe-content p {
  margin: 0 0 12px 0;
  font-size: 0.9em;
  color: #555;
}
.recipe-card-buttons {
  display: flex;
  gap: 10px;
}
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
.btn-remove {
  background-color: #ffe6e6;
  color: #c53030;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}

/* NOTIFICATION */
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  color: #333;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 3000;
  animation: slideIn 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-family: 'Arial', sans-serif;
}
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
`;

// ===============================================
// COMPONENTS
// ===============================================

const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      ✅ {message}
    </div>
  );
};

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const ProfileFormView: React.FC<{ user: any; setNotification: (msg: string) => void }> = ({ user, setNotification }) => {
  const { data, setData, post, processing, errors } = useForm<ProfileFormData>({
    name: user.name || '',
    email: user.email || '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/test-profile/update', {
      onSuccess: () => setNotification("Profile updated successfully!"),
      onError: () => setNotification("Failed to update profile.")
    });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    router.post('/user/profile-photo', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setNotification("Profile photo updated successfully!");
      },
      onError: () => {
        setNotification("Failed to update profile photo.");
      }
    });
  };

  return (
    <form className="profile-form" onSubmit={submit}>
      <div className="profile-form-header">
        <div
          style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={user.profile_photo_url || user.profile_photo_path ? `/storage/${user.profile_photo_path}` : "https://via.placeholder.com/50"}
            alt="Avatar"
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: -5,
            right: -5,
            background: 'white',
            borderRadius: '50%',
            padding: '2px',
            fontSize: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            📷
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        <span className="profile-name">{user.name}</span>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
        />
        {errors.name && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
        />
        {errors.email && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={data.password}
          onChange={e => setData('password', e.target.value)}
        />
        {errors.password && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</div>}
      </div>
      <button type="submit" className="save-btn" disabled={processing}>
        {processing ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  );
};

// === EDIT PREFERENCES – SAME BOX STYLE AS REGISTER ===

interface PreferencesFormData {
  diet: string;
  allergies: string[];
  cuisine: string[];
}

const EditPreferencesView: React.FC<{ user: any; setNotification: (msg: string) => void }> = ({ user, setNotification }) => {
  const { data, setData, post, processing, errors } = useForm<PreferencesFormData>({
    diet: user.diet || "No specific diet",
    allergies: user.allergies || [],
    cuisine: user.cuisine || []
  });

  const toggleAllergy = (item: string) => {
    const newAllergies = data.allergies.includes(item)
      ? data.allergies.filter((x: string) => x !== item)
      : [...data.allergies, item];
    setData('allergies', newAllergies);
  };

  const toggleCuisine = (item: string) => {
    const newCuisine = data.cuisine.includes(item)
      ? data.cuisine.filter((x: string) => x !== item)
      : [...data.cuisine, item];
    setData('cuisine', newCuisine);
  };

  const submit = () => {
    post('/test-profile/preferences', {
      onSuccess: () => setNotification("Preferences updated successfully!"),
      onError: (err) => {
        console.error("Preference update errors:", err);
        setNotification("Failed to update preferences. Check console.");
      }
    });
  };

  return (
    <>
      <h2>Edit Preferences</h2>

      {/* Diet */}
      <div className="pref-group">
        <h3>Do you follow any specific diet?</h3>
        <div className="pref-options">
          {["No specific diet", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo"].map(item => (
            <div
              key={item}
              className={`pref-option ${data.diet === item ? "selected" : ""}`}
              onClick={() => setData('diet', item)}
            >
              <input
                type="radio"
                name="diet"
                value={item}
                checked={data.diet === item}
                readOnly
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="pref-group">
        <h3>Do you have any allergies or intolerances?</h3>
        <div className="pref-options">
          {["Shellfish", "Dairy", "Nuts", "Eggs", "Soy", "Gluten"].map(item => (
            <div
              key={item}
              className={`pref-option ${data.allergies.includes(item) ? "selected" : ""}`}
              onClick={() => toggleAllergy(item)}
            >
              <input
                type="checkbox"
                name="allergies"
                value={item}
                checked={data.allergies.includes(item)}
                readOnly
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div className="pref-group">
        <h3>Choose your favourite cuisines</h3>
        <div className="pref-options">
          {["Indian", "Mexican", "American", "Asian", "Mediterranean", "Italian"].map(item => (
            <div
              key={item}
              className={`pref-option ${data.cuisine.includes(item) ? "selected" : ""}`}
              onClick={() => toggleCuisine(item)}
            >
              <input
                type="checkbox"
                name="cuisine"
                value={item}
                checked={data.cuisine.includes(item)}
                readOnly
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="save-btn" type="button" onClick={submit} disabled={processing}>
        {processing ? 'Saving...' : 'Save changes'}
      </button>
    </>
  );
};

// === HISTORY (KEEP SIMPLE LIKE BEFORE) ===
const HistoryView: React.FC = () => (
  <>
    <h2>History</h2>
    <div className="history-list">
      <div className="history-item">
        <img src="https://via.placeholder.com/150x100" alt="Aglio Olio" />
        <div>
          <h3>Aglio Olio</h3>
          <p>Simple Italian dish with garlic and olive oil.</p>
        </div>
      </div>
    </div>
  </>
);

// === LOGOUT MODAL (TYPED) ===
type LogoutModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirm }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="logout-modal-box" onClick={(e) => e.stopPropagation()}>
      <h2>Are you sure you want to log out?</h2>
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
// MAIN COMPONENT
// ===============================================
type ActiveView = "profile" | "preferences" | "history";

interface TestProfileProps {
  user: any;
  savedRecipes: any[];
}

const TestProfile: React.FC<TestProfileProps> = ({ user, savedRecipes }) => {
  const [activeView, setActiveView] = useState<ActiveView>("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState<{ recipe_name: string; image_url: string }[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch("/recommended")
      .then(res => res.json())
      .then(data => setRecommended(data));
  }, []);

  useEffect(() => {
    if (!document.getElementById("profile-styles")) {
      const style = document.createElement("style");
      style.id = "profile-styles";
      style.innerHTML = profileStyles;
      document.head.appendChild(style);
    }
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "preferences":
        return <EditPreferencesView user={user} setNotification={setNotification} />;
      case "history":
        return <HistoryView />;
      default:
        return <ProfileFormView user={user} setNotification={setNotification} />;
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.visit("/test-home");
  };

  const toggleSave = (recipeId: number) => {
    const isCurrentlySaved = isSaved(recipeId);
    router.post('/recipes/toggle-save', { recipe_id: recipeId }, {
      preserveScroll: true,
      onSuccess: () => {
        if (!isCurrentlySaved) {
          setNotification("Recipe successfully added!");
        } else {
          setNotification("Recipe successfully removed!");
        }
      }
    });
  };

  const nextSlide = () => {
    if (currentSlide + 3 < savedRecipes.length) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const isSaved = (recipeId: number) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const handleTyping = async (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/search-suggest?q=${value}`);
    const data = await response.json();
    setSuggestions(data);
  };

  const selectSuggestion = (text: string) => {
    setSearchQuery(text);
    setShowSuggest(false);
    handleSearch(text);
  };

  const handleSearch = async (overrideQuery?: string) => {
    const q = overrideQuery || searchQuery;
    if (!q.trim()) return;
    const response = await fetch(`/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    setSearchResults(data);
  };



  const searchRef = React.useRef<HTMLDivElement>(null);

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
      <nav className="profile-navbar">
        <Link href="/test-home" className="profile-logo">
          <img src="/NutriMatch Logo.png" alt="NutriMatch" />
          NutriMatch
        </Link>

        <div className="search-container">
          <div ref={searchRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleTyping}
                onFocus={() => setShowSuggest(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button className="search-btn" onClick={() => handleSearch()}>Search</button>

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

        <div className="profile-nav-links">
          <Link href="/test-dashboard">Home</Link>
          <Link href="/test-profile" className="active">
            Profile
          </Link>
        </div>
      </nav>

      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="sidebar-user">
            <img src={user.profile_photo_url || "https://via.placeholder.com/70"} alt="Avatar" />
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
          <ul className="sidebar-nav">
            <li>
              <button
                onClick={() => setActiveView("profile")}
                className={activeView === "profile" ? "active" : ""}
              >
                👤 My profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView("preferences")}
                className={activeView === "preferences" ? "active" : ""}
              >
                ✏️ Edit preferences
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView("history")}
                className={activeView === "history" ? "active" : ""}
              >
                🔄 View history
              </button>
            </li>
            <li>
              <button
                className="logout"
                onClick={() => setShowLogoutModal(true)}
              >
                ➡️ Log out
              </button>
            </li>
          </ul>
        </aside>

        <main className="profile-content">{renderView()}</main>
      </div>

      {/* Search Results Section */}
      {/* Search Results Modal */}
      {searchResults.length > 0 && (
        <div className="modal-overlay" onClick={() => setSearchResults([])}>
          <div className="modal-box" style={{ width: 'auto', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Search Results</h2>
              <button
                onClick={() => setSearchResults([])}
                style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', color: '#666' }}
              >
                ✖
              </button>
            </div>

            <div className="saved-recipe-grid" style={{ gridTemplateColumns: `repeat(${Math.min(searchResults.length, 3)}, 1fr)` }}>
              {searchResults.map((r: any, i) => (
                <div key={i} className="saved-recipe-card">
                  <img
                    src={r.image_url || "https://via.placeholder.com/400x200/ccc/888?text=Food"}
                    alt={r.recipe_name}
                  />
                  <div className="saved-recipe-content">
                    <h3>{r.recipe_name}</h3>
                    <p>{r.category} • {r.nutrition_calories} kcal</p>
                    <div className="recipe-card-buttons">
                      <button className="btn-view">View Recipe</button>
                      <button
                        className={isSaved(r.id) ? "btn-remove" : "btn-save"}
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

      {/* Recommended Recipes Section */}
      <section className="saved-recipe-section">
        <h2>Recommended for You</h2>
        <div className="saved-recipe-grid">
          {recommended.map((r: any, i) => (
            <div key={i} className="saved-recipe-card">
              <img
                src={r.image_url || "https://via.placeholder.com/400x200/ccc/888?text=Food"}
                alt={r.recipe_name}
              />
              <div className="saved-recipe-content">
                <h3>{r.recipe_name}</h3>
                <p>{r.category} • {r.nutrition_calories} kcal</p>
                <div className="recipe-card-buttons">
                  <button className="btn-view">View Recipe</button>
                  <button
                    className={isSaved(r.id) ? "btn-remove" : "btn-save"}
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

      {/* Saved Recipes */}
      <section className="saved-recipe-section">
        <h2>Saved Recipes</h2>
        {savedRecipes.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>You haven't saved any recipes yet.</p>
        ) : (
          <div className="carousel-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {savedRecipes.length > 3 && (
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                style={{
                  background: '#77DD77',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentSlide === 0 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2em',
                  fontWeight: 'bold'
                }}
              >
                &lt;
              </button>
            )}

            <div className="saved-recipe-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '25px',
              flexGrow: 1,
              overflow: 'hidden' // Hide scrollbar for carousel look
            }}>
              {savedRecipes.slice(currentSlide, currentSlide + 3).map((r, i) => (
                <div key={i} className="saved-recipe-card">
                  <img src={r.image_url || "https://via.placeholder.com/400x200/ccc/888?text=Food"} alt={r.recipe_name} />
                  <div className="saved-recipe-content">
                    <h3>{r.recipe_name}</h3>
                    <p>{r.category} • {r.nutrition_calories} kcal</p>
                    <div className="recipe-card-buttons">
                      <button className="btn-view">View Recipe</button>
                      <button className="btn-remove" onClick={() => toggleSave(r.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {savedRecipes.length > 3 && (
              <button
                onClick={nextSlide}
                disabled={currentSlide + 3 >= savedRecipes.length}
                style={{
                  background: '#77DD77',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: currentSlide + 3 >= savedRecipes.length ? 'not-allowed' : 'pointer',
                  opacity: currentSlide + 3 >= savedRecipes.length ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2em',
                  fontWeight: 'bold'
                }}
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </section>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default TestProfile;


