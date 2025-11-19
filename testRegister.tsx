import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";

// ----------------------
// TYPES FOR REGISTER FORM 19/11/2025
// ----------------------
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  diet: string;
  allergies: string[];
  preferences: string[];

  gender: string;
  goal: string;
  height: string;      // cm
  weight: string;      // kg
  activity: string;
  calorieTarget: number;
}

// ===============================================
// BEAUTIFUL STYLES + PASSWORD VALIDATION COLORS
// ===============================================
const registerStyles = `
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  color: #333;
}

/* Remove grey background when browser autofills input */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  box-shadow: 0 0 0px 1000px white inset !important;
  background-color: white !important;
  -webkit-text-fill-color: #333 !important;
}

input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: #333 !important;
}

.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}
.register-box {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 680px;
  padding: 50px 60px;
  position: relative;
  animation: fadeIn 0.4s ease-in;
}
@keyframes fadeIn {
  from {opacity: 0; transform: translateY(20px);}
  to {opacity: 1; transform: translateY(0);}
}
.back-home {
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 0.95em;
  color: #555;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}
.back-home:hover { color: #222; text-decoration: underline; }
.logo-top {
  display: block;
  margin: 0 auto 10px;
  width: 70px;
  height: 70px;
  object-fit: contain;
}
.register-box h1 {
  text-align: center;
  margin: 0;
  font-size: 1.8em;
  font-weight: 700;
}
.register-box p {
  text-align: center;
  color: #666;
  margin: 4px 0 30px;
  font-size: 0.9em;
}

/* Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
}
/* Line only between circles */
.progress-line {
  position: absolute;
  top: 18px;
  left: calc(100% / 6);
  width: calc(100% * 4 / 6);
  height: 3px;
  background-color: #e0e0e0;
  z-index: 0;
}
.progress-fill {
  position: absolute;
  top: 18px;
  left: calc(100% / 6);
  height: 3px;
  background-color: #4CAF50;
  z-index: 1;
  transition: width 0.3s ease;
}

.step {
  text-align: center;
  z-index: 2;
  flex: 1;
}
.step-number {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #4CAF50;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1em;
  margin: 0 auto 5px;
  transition: all 0.3s ease;
}
.step.active .step-number,
.step.completed .step-number {
  background: #4CAF50;
  color: white;
}
.step p {
  font-size: 0.85em;
  color: #444;
  margin: 0;
  font-weight: 500;
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
}
label {
  font-size: 0.9em;
  margin-bottom: 6px;
  font-weight: 500;
}
input, select {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 0.95em;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
  color: #333;
}
input:focus, select:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76,175,80,0.15);
  outline: none;
}

/* Password rule styling */
.rule {
  font-size: 0.8em;
  margin-top: 3px;
}
.rule.invalid {
  color: red;
}
.rule.valid {
  color: green;
}

/* STEP 2 STYLES */
.section-title {
  margin-bottom: 8px;
  font-size: 1em;
  font-weight: 600;
  color: #333;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.option-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.25s ease;
}
.option-box:hover {
  border-color: #4CAF50;
}
.option-box.selected {
  border-color: #4CAF50;
  background-color: #eaffea;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.25);
}

/* BASE: Custom radio + checkbox */
.option-box input[type="radio"],
.option-box input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #cccccc;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}
/* checkbox square */
.option-box input[type="checkbox"] {
  border-radius: 5px;
}
/* Radio selected → white dot */
.option-box.selected input[type="radio"]::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* Checkbox selected → white tick */
.option-box.selected input[type="checkbox"]::after {
  content: "✓";
  color: white;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -55%);
}
.option-box.selected input[type="radio"],
.option-box.selected input[type="checkbox"] {
  background: #4CAF50;
  border-color: #4CAF50;
}

/* STEP 3 – HEALTH GOALS */
.goal-row,
.gender-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.pill-option {
  flex: 1;
  min-width: 140px;
  border-radius: 999px;
  border: 1px solid #ccc;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: white;
  font-size: 0.9em;
  transition: all 0.2s ease;
}
.pill-option:hover {
  border-color: #4CAF50;
}
.pill-option.selected {
  border-color: #4CAF50;
  background-color: #eaffea;
  font-weight: 600;
}

.hw-row {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}
.hw-input {
  flex: 1;
  display: flex;
  align-items: center;
}
.hw-input input {
  border-radius: 6px 0 0 6px;
  border-right: none;
}
.unit-badge {
  padding: 10px 14px;
  font-size: 0.8em;
  background: #f0f0f0;
  border-radius: 0 6px 6px 0;
  border: 1px solid #ccc;
  border-left: none;
}

/* activity select full width */
.activity-select {
  width: 100%;
}

/* CALORIE CARD */
.calorie-card {
  margin-top: 10px;
  padding: 18px 20px 22px;
  border-radius: 14px;
  background: #eaffea;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.calorie-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  color: #777;
}
.calorie-header span:first-child {
  font-weight: 600;
  color: #333;
}
.calorie-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calorie-value {
  font-weight: 700;
}
.calorie-minmax {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  margin-top: 4px;
}

/* slider */
.calorie-slider {
  width: 100%;
  margin-top: 8px;
}
.calorie-slider input[type="range"] {
  width: 100%;
}

/* Buttons */
.nav-buttons {
  margin-top: 35px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
button {
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 0.95em;
}
.prev-btn {
  background-color: #f3f3f3;
}
.next-btn, .done-btn {
  background-color: #4CAF50;
  color: white;
}
.next-btn:hover, .done-btn:hover {
  background-color: #3b8c3c;
}
`;

export default function TestRegister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    diet: "",
    allergies: [],
    preferences: [],

    gender: "",
    goal: "",
    height: "",
    weight: "",
    activity: "",
    calorieTarget: 1900,
  });

  const [recommendedCalories, setRecommendedCalories] = useState<number>(1900);

  // =========================
  // PASSWORD LIVE VALIDATION
  // =========================
  const passwordRules = {
    length: formData.password.length >= 8,
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const confirmMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  // inject styles once
  useEffect(() => {
    if (!document.getElementById("register-styles")) {
      const style = document.createElement("style");
      style.id = "register-styles";
      style.innerHTML = registerStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // toggle for allergies/preferences
  const toggleSelect = (field: "allergies" | "preferences", value: string) => {
    setFormData((prev) => {
      const list = prev[field];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter((i) => i !== value) };
      }
      return { ...prev, [field]: [...list, value] };
    });
  };

  // -------------------------
  // STEP 1 & 2 VALIDATION
  // -------------------------
  const handleNext = () => {
    // STEP 1
    if (step === 1) {
      if (!passwordRules.length || !passwordRules.special || !confirmMatch) {
        alert("Please complete password requirements first.");
        return;
      }

      if (!formData.firstName.trim() || !formData.email.trim()) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    // STEP 2
    if (step === 2) {
      if (!formData.diet) {
        alert("Please select your diet.");
        return;
      }
      if (formData.allergies.length === 0) {
        alert("Select at least one allergy.");
        return;
      }
      if (formData.preferences.length === 0) {
        alert("Select at least one preference.");
        return;
      }
    }

    setStep((s) => Math.min(3, s + 1));
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  // -------------------------
  // STEP 3 VALIDATION + SUBMIT
  // -------------------------
  const handleDone = () => {
    if (
      !formData.gender ||
      !formData.goal ||
      !formData.height.trim() ||
      !formData.weight.trim() ||
      !formData.activity
    ) {
      alert("Please complete your health goals first.");
      return;
    }

    console.log("✅ Final register data:", formData);
    router.visit("/test-login");
  };

  // =========================
  // CALORIE RECOMMENDATION
  // =========================
useEffect(() => {
  const h = parseFloat(formData.height);
  const w = parseFloat(formData.weight);

  // Check if all required inputs exist
  if (
    !formData.gender ||
    !formData.goal ||
    !formData.activity ||
    isNaN(h) ||
    isNaN(w) ||
    h <= 0 ||
    w <= 0
  ) {
    setRecommendedCalories(0);
    return;
  }

  // Basic Mifflin-St Jeor
  const age = 25;
  let bmr =
    formData.gender === "Male"
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;

  let activityFactor = 1.2;
  if (formData.activity === "Lightly active") activityFactor = 1.375;
  else if (formData.activity === "Moderately active") activityFactor = 1.55;
  else if (formData.activity === "Very active") activityFactor = 1.725;

  let tdee = bmr * activityFactor;

  let goalFactor = 1;
  if (formData.goal === "Lose weight") goalFactor = 0.8;
  else if (formData.goal === "Gain weight") goalFactor = 1.15;

  let rec = Math.round(tdee * goalFactor);

  if (rec < 1200) rec = 1200;
  if (rec > 3500) rec = 3500;

  setRecommendedCalories(rec);

  // Set slider value to recommended only when valid
  setFormData((prev) => ({
    ...prev,
    calorieTarget: rec,
  }));
}, [
  formData.gender,
  formData.goal,
  formData.height,
  formData.weight,
  formData.activity,
]);


  // error state (currently unused visually but kept)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateStep1 = () => {
    const newErrors: any = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address";

    const hasLength = formData.password.length >= 8;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    if (!hasLength || !hasSpecial)
      newErrors.password =
        "Password must be at least 8 characters & include a special character";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <Link href="/test-home" className="back-home">
          ← Back to Home
        </Link>

        <img src="/NutriMatch Logo.png" className="logo-top" />
        <h1>Create Your Account</h1>
        <p>
          Step {step} of 3 :{" "}
          {step === 1
            ? "Personal Information"
            : step === 2
            ? "Tell us about your dietary needs"
            : "Set your health goals"}
        </p>

        {/* STEP INDICATOR */}
        <div className="stepper">
          <div className="progress-line"></div>
          <div
            className="progress-fill"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>

          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`step ${
                step === n ? "active" : step > n ? "completed" : "inactive"
              }`}
            >
              <div className="step-number">{n}</div>
              <p>
                {n === 1
                  ? "Personal Info"
                  : n === 2
                  ? "Dietary Preferences"
                  : "Health Goals"}
              </p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  onChange={handleInput}
                  value={formData.firstName}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  onChange={handleInput}
                  value={formData.lastName}
                />
              </div>

              <div className="form-group" style={{ flexBasis: "100%" }}>
                <label>Email</label>
                <input
                  name="email"
                  onChange={handleInput}
                  value={formData.email}
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                />
                <div
                  className={`rule ${
                    passwordRules.length ? "valid" : "invalid"
                  }`}
                >
                  • At least 8 characters
                </div>
                <div
                  className={`rule ${
                    passwordRules.special ? "valid" : "invalid"
                  }`}
                >
                  • Must include one special character (!@#$%^&*)
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInput}
                />
                <div className={`rule ${confirmMatch ? "valid" : "invalid"}`}>
                  • Passwords must match
                </div>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {/* DIET */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <h3 className="section-title">
                  Do you follow any specific diet?
                </h3>

                <div className="option-grid">
                  {[
                    "No specific diet",
                    "Vegetarian",
                    "Vegan",
                    "Pescatarian",
                    "Keto",
                    "Paleo",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`option-box ${
                        formData.diet === item ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, diet: item }))
                      }
                    >
                      <input
                        type="radio"
                        checked={formData.diet === item}
                        readOnly
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ALLERGIES */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <h3 className="section-title">
                  Do you have any allergies or intolerances?
                </h3>

                <div className="option-grid">
                  {["Shellfish", "Dairy", "Nuts", "Eggs", "Soy", "Gluten"].map(
                    (item) => (
                      <div
                        key={item}
                        className={`option-box ${
                          formData.allergies.includes(item) ? "selected" : ""
                        }`}
                        onClick={() => toggleSelect("allergies", item)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.allergies.includes(item)}
                          readOnly
                        />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CUISINE PREFERENCES */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <h3 className="section-title">Choose your preferences</h3>

                <div className="option-grid">
                  {[
                    "Indian",
                    "Mexican",
                    "American",
                    "Asian",
                    "Mediterranean",
                    "Italian",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`option-box ${
                        formData.preferences.includes(item) ? "selected" : ""
                      }`}
                      onClick={() => toggleSelect("preferences", item)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.preferences.includes(item)}
                        readOnly
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 3 – HEALTH GOALS */}
          {step === 3 && (
            <>
              {/* PRIMARY GOAL */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <h3 className="section-title">What is your primary goal?</h3>
                <div className="goal-row">
                  {["Lose weight", "Maintain weight", "Gain weight"].map(
                    (g) => (
                      <div
                        key={g}
                        className={`pill-option ${
                          formData.goal === g ? "selected" : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, goal: g }))
                        }
                      >
                        {g}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* GENDER */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <h3 className="section-title">Gender</h3>
                <div className="gender-row">
                  {["Male", "Female"].map((g) => (
                    <div
                      key={g}
                      className={`pill-option ${
                        formData.gender === g ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, gender: g }))
                      }
                    >
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* HEIGHT & WEIGHT */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <div className="hw-row">
                  <div className="hw-input">
                    <div style={{ flex: 1 }}>
                      <label>Height</label>
                      <div style={{ display: "flex" }}>
                        <input
                          name="height"
                          value={formData.height}
                          onChange={handleInput}
                          placeholder="In Centimeter"
                        />
                        <div className="unit-badge">cm</div>
                      </div>
                    </div>
                  </div>

                  <div className="hw-input">
                    <div style={{ flex: 1 }}>
                      <label>Weight</label>
                      <div style={{ display: "flex" }}>
                        <input
                          name="weight"
                          value={formData.weight}
                          onChange={handleInput}
                          placeholder="In Kilogram"
                        />
                        <div className="unit-badge">kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY LEVEL */}
              <div className="section-block" style={{ flexBasis: "100%" }}>
                <label>Activity Level</label>
                <select
                  className="activity-select"
                  name="activity"
                  value={formData.activity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      activity: e.target.value,
                    }))
                  }
                >
                  <option value="">Select your activity level</option>
                  <option>Sedentary</option>
                  <option>Lightly active</option>
                  <option>Moderately active</option>
                  <option>Very active</option>
                </select>
              </div>

             {/* DAILY CALORIE TARGET */}
<div className="section-block" style={{ flexBasis: "100%" }}>
  <label>Daily calorie target</label>

  {/* If values incomplete → show placeholder */}
  {recommendedCalories === 0 ? (
    <div className="calorie-card" style={{ background: "#f5f5f5", color: "#999" }}>
      Enter all information to calculate your recommended calories.
    </div>
  ) : (
    <div className="calorie-card">
      <div className="calorie-header">
        <span>Recommended : {recommendedCalories}</span>
        <span>Based on your information</span>
      </div>

      <div className="calorie-main">
        <span className="calorie-value">
          {formData.calorieTarget} kcal
        </span>
      </div>

      <div className="calorie-slider">
        <input
          type="range"
          min={1500}
          max={3000}
          step={50}
          value={formData.calorieTarget}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              calorieTarget: Number(e.target.value),
            }))
          }
        />
      </div>

      <div className="calorie-minmax">
        <span>1500</span>
        <span>3000</span>
      </div>
    </div>
  )}
</div>

            </>
          )}
        </form>

        {/* BUTTONS */}
        <div className="nav-buttons">
          {step > 1 && (
            <button className="prev-btn" onClick={handlePrev} type="button">
              ← Previous
            </button>
          )}

          {step < 3 && (
            <button className="next-btn" onClick={handleNext} type="button">
              Next →
            </button>
          )}

          {step === 3 && (
            <button className="done-btn" onClick={handleDone} type="button">
              Done →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
