import { useEffect, useState } from "react";
import Slider1 from "../Components/Slider1.jsx";
import Blackbar from "../Components/Blackbar.jsx";
import Productcard from "../Components/Productcard.jsx";
import Categories from "../Components/Categories.jsx";
import Herosection from "../Components/Herosection.jsx";
import Features from "../Components/Features.jsx";
import FindYourFit from "../Components/Findyourfit.jsx";
import Inspiration from "../Components/Inspiration.jsx";
import gl1 from "../assets/images/gl1.png";
import gl2 from "../assets/images/gl2.png";
import gl3 from "../assets/images/gl3.png";
import gl4 from "../assets/images/gl4.png";

import axios from 'axios';

const Home = () => {
    const [activeTab, setActiveTab] = useState("new");
    const [Data,setdata] = useState([]);
/* ----------------------------------------- ------------------------------------------------------------------------------------- */

useEffect(() => {
  axios.get("https://e-commerce-backend-node-js-eyecore.vercel.app/products")
    .then((res) => setdata(res.data))
    .catch((err) => console.log(err));
}, []);

// const product = [
//         {img:p1, pname:"Eyeglasses", price:"$200.24"},
//         {img:p2, pname:"Eyeglasses", price:"$200.24"},
//         {img:p3, pname:"Eyeglasses", price:"$200.24"},
//         {img:p4, pname:"Eyeglasses", price:"$200.24"},
//         {img:p5, pname:"Eyeglasses", price:"$200.24"},
//         {img:p6, pname:"Eyeglasses", price:"$200.24"},
//     ]

/* ----------------------------------------- ------------------------------------------------------------------------------------- */
    const category = [
        {img:gl1, categorie:"Eyeglasses", count:"6 items"}, 
        {img:gl2, categorie:"Progressive", count:"6 items"}, 
        {img:gl3, categorie:"Sunglasses", count:"7 items"}, 
        {img:gl4, categorie:"Essential", count:"6 items"}, 
    ]
/* ----------------------------------------- ------------------------------------------------------------------------------------- */
    return(
        <>
{/* ----------------------------------------- ------------------------------------------------------------------------------------- */}
        {/* <div className="container">
            <Header/>
        </div> */}
{/* ----------------------------------------- ------------------------------------------------------------------------------------- */}
        <div className="slider1">
            <Slider1/>
        </div>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="herosection">
            <Herosection/>

        </div>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="timer">
            <Blackbar/>
        </div>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}


<section className="nr-section">
      {/* Tabs */}
      <div className="nr-tabs">
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          NEW RELEASES
        </button>
        <button
          className={activeTab === "best" ? "active" : ""}
          onClick={() => setActiveTab("best")}
        >
          BEST SELLERS
        </button>
      </div>

      {/* Grid */}
      <div className="nr-grid">
        {Data.slice(0, 6).map((item) => (
          <Productcard 
           img={`http://localhost:5000/${item.image}`} pname={item.name} price={item.price}/>
        ))}
      </div>
    </section>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}
<div className="Fyf container-fluid">
    <FindYourFit/>
</div>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="categories-bg">
            <div className="container-fluid">
                <div className="C-title">
                    <h2>
                        Shop by Categories
                    </h2>
                </div>
                <div className="c-content d-flex justify-content-between">
                {
                    category.map((item)=>{
                        return(
                            <Categories img={item.img} categorie={item.categorie} count={item.count}/>
                        )
                    })
                }
                </div> 
            </div>
        </div>   
 {/* ------------------------------------------------------------------------------------------------------------------------------ */}
    <div className="insp">
        <Inspiration/>
    </div>
 
 {/* ------------------------------------------------------------------------------------------------------------------------------ */}
<div className="features-bg">
    <div className="container-fluid">
        <Features/>
    </div>
</div>

 {/* ------------------------------------------------------------------------------------------------------------------------------ */}
                {/* <div className="footer-bg">
                    <div className="container-fluid">
                        <Footer/>
                    </div>
                </div> */}
 {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        </>
    )

}
export default Home;