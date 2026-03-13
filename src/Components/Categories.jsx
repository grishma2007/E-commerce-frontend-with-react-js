const Categories = ({ img, categorie, count }) => {
  const cardStyle = {
    margin: "5px 0",
    flex: "0 0 auto",
    cursor: "pointer",
  };

  const imgWrapperStyle = {
    height: "225px",
    width: "320px",
    margin: "0 0 10px",
    overflow: "hidden",
    borderRadius: "8px",
  };

  const imgStyle = {
    height: "225px",
    width: "320px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
  };

  const h5Style = {
    fontFamily: "'Gloock', serif",
    fontSize: "18px",
    margin: "8px 0 2px",
  };

  const h6Style = {
    fontSize: "14px",
    fontFamily: "'AlbertSans', sans-serif",
    color: "#666",
    margin: 0,
  };

  // Responsive image size based on screen width
  const isMobile = window.innerWidth <= 576;
  const isTablet = window.innerWidth <= 1024;

  const responsiveSize = isMobile
    ? { width: "180px", height: "140px" }
    : isTablet
    ? { width: "240px", height: "175px" }
    : { width: "320px", height: "225px" };

  return (
    <div className="categories" style={cardStyle}>
      <div style={{ ...imgWrapperStyle, ...responsiveSize }}>
        <img
          src={img}
          alt={categorie}
          style={{ ...imgStyle, ...responsiveSize }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div className="content">
        <h5 style={h5Style}>{categorie}</h5>
        <h6 style={h6Style}>{count}</h6>
      </div>
    </div>
  );
};

export default Categories;