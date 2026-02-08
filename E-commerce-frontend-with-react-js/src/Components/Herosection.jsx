import hs1 from "../assets/images/hs1.png";
import hs2 from "../assets/images/hs2.png";

const HeroSection = () => {
  return (
    <section className="hero-split">
      
      {/* LEFT */}
      <div
        className="hero-card"
        style={{
          backgroundImage: `url(${hs1})`,
        }}
      >
        <div className="hero-content">
          <h2>Glasses</h2>
          <button className="hero-btn">SHOP NOW</button>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="hero-card"
        style={{
          backgroundImage: `url(${hs2})`,
        }}
      >
        <div className="hero-content">
          <h2>Sunglasses</h2>
          <button className="hero-btn outline">SHOP NOW</button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
