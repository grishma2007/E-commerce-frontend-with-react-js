
const Productcard = ({ pname, price, img }) => {
  const cardstyle = {

    padding: "20px",
    borderRadius: "40px",
    textAlign: "start",
    boder:"none",
  };

  const imgstyle = {

    width: "90%",
    marginBottom: "10px",

    display: "flex",
   
  };

  return (
    <>
      <div className="card" style={cardstyle}>
        <div className="img" style={imgstyle}>
          <img
            src={img}
            alt="product"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="content">
          <h5>{pname}</h5>
          <h4>{price}</h4>
        </div>
      </div>
    </>
  );
};

export default Productcard;
