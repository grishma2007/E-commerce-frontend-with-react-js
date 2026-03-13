import { useState, useEffect } from "react";

const Categories = ({ img, categorie, count }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const size =
    width <= 576
      ? { w: "140px", h: "140px" }
      : width <= 1024
      ? { w: "200px", h: "180px" }
      : { w: "320px", h: "225px" };

  return (
    <div
      style={{
        flex: "0 0 auto",
        margin: "5px 0",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: size.w,
          height: size.h,
          overflow: "hidden",
          borderRadius: "10px",
          marginBottom: "10px",
          background: "#f5f5f5",
        }}
      >
        <img
          src={img}
          alt={categorie}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <h5
        style={{
          fontFamily: "'Gloock', serif",
          fontSize: width <= 576 ? "14px" : "18px",
          margin: "6px 0 2px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {categorie}
      </h5>
      <h6
        style={{
          fontSize: width <= 576 ? "11px" : "14px",
          fontFamily: "'AlbertSans', sans-serif",
          color: "#666",
          margin: 0,
          fontWeight: "400",
        }}
      >
        {count}
      </h6>
    </div>
  );
};

export default Categories;