import fit1 from "../assets/images/fit1.png";
import fit2 from "../assets/images/fit2.png";
import fit3 from "../assets/images/fit3.png";

const FindYourFit = () => {
  const fitData = [
    {
      img: fit1,
      title: "Adjustable fit",
      desc: "Our most versatile frames fit more faces and head sizes.",
    },
    {
      img: fit2,
      title: "Low-Bridge fit",
      desc: "Great for a lower nose bridge and higher cheekbones.",
    },
    {
      img: fit3,
      title: "Standard fit",
      desc: "Designed to fit most face shapes comfortably.",
    },
  ];

  return (
    <section className="fit-section">
      <h2 className="fit-title">Find your fit</h2>
      <p className="fit-subtitle">
        See a few in their favor to frames from Ecomus.
      </p>

      <div className="fit-grid">
        {fitData.map((item, index) => (
          <div className="fit-card" key={index}>
            <div className="fit-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h4>{item.title}</h4>
            <p>{item.desc}</p>

            <a href="#" className="fit-link">
              SHOP COLLECTION →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FindYourFit;
