import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
/* ========== GLOBAL STYLE ========== */
body {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  /* LATAR BELAKANG BARU SEPERTI DIMINTA */
  background: linear-gradient(to bottom right, #b0f0e0, #2af598);
  color: #333;
  overflow-x: hidden;
}

/* ========== ANIMATIONS ========== */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== NAVBAR (TIDAK BERGERAK) ========== */
.navbar {
  /* position: fixed; DIBUANG */
  /* top: 20px; DIBUANG */
  /* left: 50%; DIBUANG */
  /* transform: translateX(-50%); DIBUANG */
  /* z-index: 1000; DIBUANG */

  /* GANTI DENGAN INI UNTUK PUSATKAN */
  margin: 20px auto 0 auto; /* 20px atas, auto kiri/kanan */

  /* STail ASAL DIKEKALKAN */
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 70px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  border-radius: 15px;
  animation: slideDown 0.8s ease-out;

  /* TAMBAHAN UNTUK SAMAKAN LEBAR */
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #4b6f3f;
  font-size: 2.1em;
  letter-spacing: 0.5px;
}

.logo img {
  width: 60px;
  height: 60px;
  margin-right: 12px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.08);
}

.nav-buttons {
  display: flex;
  gap: 12px;
}

.nav-buttons .sign-in {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-buttons .sign-in:hover {
  background-color: #3b8c3c;
}

.nav-buttons .register {
  background-color: white;
  color: #4CAF50;
  border: 1px solid #4CAF50;
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-buttons .register:hover {
  background-color: #e8f9e8;
}

/* ========== HERO (MARGIN DIBETULKAN) ========== */
.hero {
  max-width: 1200px;
  /* Margin atas dikurangkan kepada 60px */
  margin: 60px auto 60px auto; 
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 90px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  gap: 40px;
  animation: fadeUp 1.2s ease-out;

  /* TAMBAHAN UNTUK SAMAKAN LEBAR */
  box-sizing: border-box;
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 3.4em;
  color: #222;
  line-height: 1.1;
  font-weight: 800;
}

.hero-text h1 span {
  color: #1e5128;
}

.hero-text p {
  font-size: 1.2em;
  color: #666;
  margin: 25px 0;
  line-height: 1.6;
}

.get-started {
  background-color: #3DA35D;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 14px 34px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.get-started:hover {
  background-color: #338c50;
  transform: translateY(-3px);
}

.get-started i {
  margin-left: 10px;
  font-style: normal;
  font-weight: bold;
}

/* SNAP box */
.snap-card {
  flex: 1;
  background-color: #f7f7f7;
  border-radius: 15px;
  padding: 30px;
  max-width: 330px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.3s ease;
}

.snap-card:hover {
  transform: translateY(-4px);
}

.snap-card h3 {
  color: #ff9900;
  font-weight: 800;
  font-size: 1.3em;
}

.snap-card h3 span {
  color: #555;
  font-weight: 600;
}

.snap-card img {
  width: 100%;
  border-radius: 12px;
  margin: 15px 0;
}

.snap-card p {
  color: #666;
  font-size: 0.95em;
}

/* ========== FEATURES / STEPS (DIBETULKAN) ========== */
.features {
  max-width: 1200px;
  margin: 60px auto;
  background-color: white;
  border-radius: 20px;
  padding: 60px 90px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  text-align: center;
  gap: 20px;
  
  /* TAMBAHAN UNTUK SAMAKAN LEBAR */
  box-sizing: border-box;
}

.feature {
  flex: 1;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
}

.feature:nth-child(1) .icon-circle {
  background-color: #e6ffe6;
  color: #3DA35D;
}

.feature:nth-child(2) .icon-circle {
  background-color: #e3f3ff;
  color: #4a90e2;
}

.feature:nth-child(3) .icon-circle {
  background-color: #f3e6ff;
  color: #9c4dcc;
}

.feature h3 {
  font-weight: 700;
  margin-bottom: 10px;
}

.feature p {
  color: #666;
  font-size: 1em;
  line-height: 1.5;
}

/* ========== FOOTER ========== */
footer {
  background-color: #fff;
  padding: 60px 100px;
  border-top: 1px solid #eee;
  animation: fadeUp 1.2s ease-out;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
}

.socials {
  display: flex;
  gap: 15px;
  font-size: 1.3em;
  color: #555;
}

.socials span:hover {
  color: #3DA35D;
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.3s;
}

.footer-columns {
  display: flex;
  gap: 80px;
}

.footer-columns h4 {
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
}

.footer-columns ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-columns li {
  margin-bottom: 6px;
  font-size: 0.95em;
  color: #666;
  transition: color 0.2s;
}

.footer-columns li:hover {
  color: #3DA35D;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  /* Lebar navbar kini dikawal oleh 'width' dan 'padding' */
  .navbar {
    width: 90%; /* Sesuaikan dengan .hero dan .features */
    padding: 15px 30px;
  }
  .hero, .features {
    width: 90%;
  }
  
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 30px;
  }
  .features {
    flex-direction: column;
    padding: 40px 30px;
  }
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
}
`;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById("home-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "home-styles";
      styleTag.innerHTML = styles;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src="/NutriMatch Logo.png" alt="NutriMatch Logo" />
          NutriMatch
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/login")} className="sign-in">
            Sign In
          </button>
          <button onClick={() => navigate("/register")} className="register">
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Discover Recipes from <br />
            <span>Your Ingredients!</span>
          </h1>
          <p>
            Take a photo of your fruits or vegetables and get personalized
            recipes that match your dietary needs and preferences.
          </p>
          <button className="get-started">
            Get Started <i>→</i>
          </button>
        </div>
        <div className="snap-card">
          <h3>
            SNAP <span>a photo</span>
          </h3>
          <img src="/veggies.jpg" alt="vegetables" />
          <p>of your fresh produce ingredients and start cooking.</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <div className="icon-circle">📸</div>
          <h3>1. Snap a Photo</h3>
          <p>
            Take a picture of your fruits or vegetables using your device's
            camera.
          </p>
        </div>
        <div className="feature">
          <div className="icon-circle">🤖</div>
          <h3>2. AI Detection</h3>
          <p>
            Our AI identifies the ingredients and analyzes their nutritional
            content.
          </p>
        </div>
        <div className="feature">
          <div className="icon-circle">📖</div>
          <h3>3. Personalized Recipes</h3>
          <p>
            Get customized recipes based on your ingredients and dietary
            preferences.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div className="socials">
            <span>✖️</span>
            <span>📸</span>
            <span>▶️</span>
            <span>💼</span>
          </div>
          <div className="footer-columns">
            <div>
              <h4>Use cases</h4>
              <ul>
                <li>UI design</li>
                <li>UX design</li>
                <li>Wireframing</li>
                <li>Diagramming</li>
                <li>Brainstorming</li>
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>Design</li>
                <li>Prototyping</li>
                <li>Design systems</li>
                <li>FigJam</li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li>Blog</li>
                <li>Best practices</li>
                <li>Colors</li>
                <li>Developers</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;