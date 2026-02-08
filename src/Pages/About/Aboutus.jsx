import { Award, Globe, PenTool, Smile } from 'lucide-react';
import './about.css';
import ab1 from "./../../assets/images/aboutus1.png"
import ab2 from "./../../assets/images/aboutus2.png"
import ab3 from "./../../assets/images/aboutus3.png"
const Aboutus = () => {
  return (
    <div className="about-page">
      
    
<section className="hero-split-wrapper">

  <div className="hero-image-side">
    <img src={ab3} alt="Design sketches" />
  </div>
    <div className="hero-text-side">
    <h1>We See Things Differently</h1>
    <p>Eyecore was born from a simple idea: that eyewear should be an extension of your personality, not just a medical necessity.</p>
  </div>
</section>

      <div className="about-container">
        
  
        <section className="story-section">
          <div className="story-content">
            <h2>Born in the Studio</h2>
            <p>
              It started in a small design studio in 2023. We were tired of choosing between 
              fast-fashion frames that broke in a month and luxury brands that cost a fortune 
              mostly for the logo.
            </p>
            <p>
              We decided to take the middle path: Uncompromising quality, Italian acetate, 
              and timeless designs—without the wholesale markup. We design everything in-house, 
              obsessing over the curve of a bridge and the weight of a temple tip.
            </p>
            <div className="signature">
              <p>Alex & Sarah</p>
              
              <span>Founders</span>
            </div>
          </div>
          <div className="story-image">
            <img src={ab1} alt="Design Process" />
          </div>
        </section>

    
        <section className="values-section">
          <div className="value-card">
            <PenTool size={32} strokeWidth={1} />
            <h3>Handcrafted Details</h3>
            <p>Every frame goes through a 40-step process, polished by hand to ensure a finish that feels like silk.</p>
          </div>
          <div className="value-card">
            <Globe size={32} strokeWidth={1} />
            <h3>Global Materials</h3>
            <p>We source our acetate from Italy and our hinges from Germany. Only the best for your face.</p>
          </div>
          <div className="value-card">
            <Award size={32} strokeWidth={1} />
            <h3>Fair Pricing</h3>
            <p>By selling directly to you, we cut out the middlemen and offer luxury grade eyewear at a fraction of the cost.</p>
          </div>
          <div className="value-card">
            <Smile size={32} strokeWidth={1} />
            <h3>Fit Guarantee</h3>
            <p>We believe in our fit so much that we offer a 30-day trial on all frames. If it's not love, send it back.</p>
          </div>
        </section>

        <section className="craft-section">
          <div className="craft-image">
            <img src={ab2} alt="Workshop" />
          </div>
          <div className="craft-content">
            <h2>The Art of Acetate</h2>
            <p>
              Acetate is not plastic. It is a plant-based material derived from cotton and wood pulp. 
              This makes it biodegradable, hypoallergenic, and incredibly durable.
            </p>
            <p>
              Unlike injection-molded plastic, acetate allows for rich, deep colors that are embedded 
              within the material, not painted on. It ages beautifully, just like you.
            </p>
            <button className="about-btn">Explore Our Materials</button>
          </div>
        </section>

        {/* 5. Quote Banner */}
        <section className="quote-banner">
          <blockquote>
            "Style is a way to say who you are without having to speak."
          </blockquote>
          <cite>— Rachel Zoe</cite>
        </section>

      </div>
    </div>
  );
};

export default Aboutus;