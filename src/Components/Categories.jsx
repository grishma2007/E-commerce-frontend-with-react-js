const Categories = ({img,categorie,count}) => {
    const cardstyle = {
        Height: "300px",
        margin:"5px 10px",
        
    }
    const imgstyle1 = {
        height:"225px",
        width:"320px",
        margin:"0 0 10px",
        
    }
    return(
        <>
        <div className="categories" style={cardstyle}>
            <div className="img" style={imgstyle1}>
                <img src={img} alt="img" height="225px" width="320px" />
            </div>
            <div className="content">
                <h5>{categorie}</h5>
                <h6>{count}</h6>
            </div>
            
        </div>
        </>
    )
}

export default Categories;