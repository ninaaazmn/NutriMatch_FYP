import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const registerStyles = `
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  /* LATAR BELAKANG BARU */
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  color: #333;
}

#root {
    min-height: 100vh;
}

.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

/* White box */
.register-box {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  padding: 50px 50px 40px;
  width: 100%;
  max-width: 650px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

/* Back to Home */
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

/* Logo */
.logo-top {
  display: block;
  margin: 5px auto 8px;
  width: 80px;
  height: auto;
  object-fit: contain;
}

/* Titles */
.register-box h1 {
  text-align: center;
  color: #333;
  font-size: 1.8em;
  font-weight: 800;
  margin: 0;
}
.register-box p {
  text-align: center;
  color: #777;
  font-size: 0.9em;
  margin: 5px 0 25px;
}

/* Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}
.progress-line {
  position: absolute;
  top: 15px;
  left: 60px;
  right: 60px;
  height: 2px;
  background-color: #4CAF50;
  z-index: 0;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  text-align: center;
  z-index: 1;
}
.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 5px;
}
.step.active .step-number {
  background-color: #4CAF50;
  color: white;
}
.step.completed .step-number {
  background-color: #4CAF50;
  color: white;
}
.step.inactive .step-number {
  background-color: #ddd;
  color: #555;
}
.step p {
  font-size: 0.9em;
  color: #333;
  font-weight: 600;
}

/* Form */
form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
label {
  font-size: 0.9em;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}
input, select {
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 0.95em;
  font-family: inherit;
  transition: all 0.2s ease;
}
input:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76,175,80,0.15);
}

/* Error message */
.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

/* Buttons */
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
button {
  border: none;
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95em;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}
button:hover { transform: translateY(-1px); }
.prev-btn { background-color: #f3f3f3; color: #333; }
.next-btn, .done-btn { background-color: #A7E3A0; color: #333; }
.next-btn:hover, .done-btn:hover { background-color: #8dd38b; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* === 1. CSS BARU DARI PROFILE.JSX DITAMPAL DI SINI === */
.pref-group {
  margin-bottom: 20px; /* Kurangkan margin sikit */
  flex-basis: 100%; /* Pastikan ia ambil lebar penuh */
}
.pref-group h3 {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 15px;
  /* Guna label asal sebagai rujukan */
  font-size: 0.9em;
  margin-bottom: 5px;
  font-weight: 500;
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
/* Kita buang .pref-option label sebab kita tak guna label di dalam .pref-option */
.pref-option span { /* Guna span untuk teks */
  margin: 0;
  font-weight: 500;
}

/* Responsif untuk skrin kecil (Register page) */
@media (max-width: 600px) {
  .pref-options {
    grid-template-columns: repeat(2, 1fr); /* 2 lajur */
  }
}
/* === AKHIR CSS BARU === */
`;

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    diet: "",
    allergies: [],
    preferences: [],
    goal: "",
    height: "",
    weight: "",
    activity: "",
    calorie: 1900,
  });

  useEffect(() => {
    if (!document.getElementById("register-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "register-styles";
      styleTag.innerHTML = registerStyles;
      document.head.appendChild(styleTag);
    }
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Poppins', Arial, sans-serif";
  }, []);

  // ✅ TOGGLE FOR MULTIPLE SELECTION
  const toggleSelect = (field, value) => {
    setFormData(prev => {
      const list = prev[field];
      return list.includes(value)
        ? { ...prev, [field]: list.filter(x => x !== value) }
        : { ...prev, [field]: [...list, value] };
    });
  };

  // ✅ VALIDATION
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name required";
      if (!formData.email.trim()) newErrors.email = "Email required";
      if (!formData.password.trim()) newErrors.password = "Password required";
    } else if (step === 2) {
      if (!formData.diet) newErrors.diet = "Please select your diet type";
      if (formData.allergies.length === 0)
        newErrors.allergies = "Select at least one allergy";
      if (formData.preferences.length === 0)
        newErrors.preferences = "Select at least one preference";
    } else if (step === 3) {
      if (!formData.goal) newErrors.goal = "Select your goal";
      if (!formData.height.trim() || !formData.weight.trim())
        newErrors.height = "Enter height and weight";
      if (!formData.activity) newErrors.activity = "Select activity level";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleNext = () => { if (validateStep()) setStep(s => s + 1); };
  const handlePrev = () => setStep(s => s - 1);
  const handleDone = () => {
    if (validateStep()) {
      console.log("✅ Registered:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <Link to="/" className="back-home">← Back to Home</Link>
        <img src="/NutriMatch Logo.png" alt="NutriMatch" className="logo-top" />
        <h1>Create Your Account</h1>
        <p>
          Step {step} of 3 :{" "}
          {step === 1 ? "Personal Information"
            : step === 2 ? "Tell us about your dietary needs"
            : "Set your health goals"}
        </p>

        {/* Stepper */}
        <div className="stepper">
          <div className="progress-line"></div>
          {[1, 2, 3].map(n => (
            <div key={n} className={`step ${step === n ? "active" : step > n ? "completed" : "inactive"}`}>
              <div className="step-number">{n}</div>
              <p>{n === 1 ? "Personal Info" : n === 2 ? "Dietary Preferences" : "Health Goals"}</p>
            </div>
          ))}
        </div>

        {/* FORM CONTENT */}
        <form>
          {step === 1 && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleInput}/>
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleInput}/>
              </div>
              <div className="form-group" style={{ flexBasis: "100%" }}>
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleInput}/>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInput}/>
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" />
              </div>
            </>
          )}

          {/* === 2. GANTIKAN KESELURUHAN BLOK 'STEP 2' INI === */}
          {step === 2 && (
            <>
              {/* --- DIET --- */}
              <div className="pref-group">
                <h3>Do you follow any specific diet?</h3>
                <div className="pref-options">
                  {["No specific diet", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo"].map(item => (
                    <div 
                      key={item} 
                      className={`pref-option ${formData.diet === item ? 'selected' : ''}`} 
                      onClick={() => setFormData(p => ({ ...p, diet: item }))}
                    >
                      <input type="radio" name="diet" value={item} checked={formData.diet === item} readOnly />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {errors.diet && <span className="error">{errors.diet}</span>}
              </div>

              {/* --- ALLERGIES --- */}
              <div className="pref-group">
                <h3>Do you have any allergies or intolerances?</h3>
                <div className="pref-options">
                  {["Shellfish", "Dairy", "Nuts", "Eggs", "Soy", "Gluten"].map(item => (
                    <div 
                      key={item} 
                      className={`pref-option ${formData.allergies.includes(item) ? 'selected' : ''}`} 
                      onClick={() => toggleSelect("allergies", item)}
                    >
                      <input type="checkbox" name="allergies" value={item} checked={formData.allergies.includes(item)} readOnly />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {errors.allergies && <span className="error">{errors.allergies}</span>}
              </div>

              {/* --- CUISINE (PREFERENCES) --- */}
              <div className="pref-group">
                <h3>Choose your preferences (Cuisine)</h3>
                <div className="pref-options">
                  {["Indian", "Mexican", "American", "Asian", "Mediterranean", "Italian"].map(item => (
                    <div 
                      key={item} 
                      className={`pref-option ${formData.preferences.includes(item) ? 'selected' : ''}`} 
                      onClick={() => toggleSelect("preferences", item)}
                    >
                      <input type="checkbox" name="preferences" value={item} checked={formData.preferences.includes(item)} readOnly />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {errors.preferences && <span className="error">{errors.preferences}</span>}
              </div>
            </>
          )}
          {/* === AKHIR BLOK 'STEP 2' === */}


          {step === 3 && (
            <>
              <div className="form-group" style={{ flexBasis: "100%" }}>
                <label>Primary Goal</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Lose weight", "Maintain weight", "Gain weight"].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, goal: g }))}
                      style={{
                        border: formData.goal === g ? "2px solid #4CAF50" : "1px solid #aaa",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        background: formData.goal === g ? "#E7F9E5" : "white",
                        cursor: "pointer",
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.goal && <span className="error">{errors.goal}</span>}
              </div>

              <div className="form-group">
                <label>Height (cm)</label>
                <input name="height" value={formData.height} onChange={handleInput}/>
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input name="weight" value={formData.weight} onChange={handleInput}/>
              </div>
              {errors.height && <span className="error">{errors.height}</span>}

              <div className="form-group" style={{ flexBasis: "100%" }}>
                <label>Activity Level</label>
                <select name="activity" value={formData.activity} onChange={handleInput}>
                  <option value="">Select activity level</option>
                  <option>Sedentary</option>
                  <option>Lightly active</option>
                  <option>Moderately active</option>
                  <option>Very active</option>
                </select>
                {errors.activity && <span className="error">{errors.activity}</span>}
              </div>
            </>
          )}
        </form>

        <div className="nav-buttons">
          {step > 1 && <button className="prev-btn" onClick={handlePrev}>← Previous</button>}
          {step < 3 && <button className="next-btn" onClick={handleNext}>Next →</button>}
          {step === 3 && <button className="done-btn" onClick={handleDone}>Done →</button>}
        </div>
      </div>
    </div>
  );
}