import insp1 from "../assets/images/insp1.jpg";
import insp2 from "../assets/images/insp2.jpg";
import insp3 from "../assets/images/insp3.jpg";
import insp4 from "../assets/images/insp4.jpg";
import insp5 from "../assets/images/insp5.jpg";

const Inspiration = () => {
  const inspirationData = [insp1, insp2, insp3, insp4, insp5];

  return (
    <section className="insp-section">
      <h2 className="insp-title">Eyecore’s inspiration</h2>
      <p className="insp-subtitle">
        See a few favorite frames from Ecomus.
      </p>

      <div className="insp-grid">
        {inspirationData.map((img, index) => (
          <div className="insp-card" key={index}>
            <img src={img} alt="Inspiration" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Inspiration;
