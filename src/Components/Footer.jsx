// import React from "react";
// import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaPinterestP } from "react-icons/fa6";
// import { FaCcVisa, FaCcPaypal, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

// const Footer=() =>{
//   return (
//     <footer className="bg-black text-white px-6 py-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
//         {/* Company Info */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">ecomus</h2>
//           <p>1234 Fashion Street, Suite 567,<br />New York, NY</p>
//           <p className="mt-2 font-semibold">
//             <a href="mailto:info@fashionshop.com" className="hover:underline">info@fashionshop.com</a>
//           </p>
//           <p className="font-semibold">
//             <a href="tel:+12125551234" className="hover:underline">(212) 555-1234</a>
//           </p>
//           <p className="mt-2 font-semibold hover:underline cursor-pointer">Get direction →</p>

//           <div className="flex gap-3 mt-5">
//             <a href="#" className="border border-white rounded-full p-2 hover:bg-white hover:text-black"><FaFacebookF /></a>
//             <a href="#" className="border border-white rounded-full p-2 hover:bg-white hover:text-black"><FaXTwitter /></a>
//             <a href="#" className="border border-white rounded-full p-2 hover:bg-white hover:text-black"><FaInstagram /></a>
//             <a href="#" className="border border-white rounded-full p-2 hover:bg-white hover:text-black"><FaTiktok /></a>
//             <a href="#" className="border border-white rounded-full p-2 hover:bg-white hover:text-black"><FaPinterestP /></a>
//           </div>
//         </div>

//         {/* Help */}
//         <div>
//           <h3 className="font-semibold text-lg mb-4">Help</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:underline">Privacy Policy</a></li>
//             <li><a href="#" className="hover:underline">Returns + Exchanges</a></li>
//             <li><a href="#" className="hover:underline">Shipping</a></li>
//             <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
//             <li><a href="#" className="hover:underline">FAQs</a></li>
//             <li><a href="#" className="hover:underline">Compare</a></li>
//             <li><a href="#" className="hover:underline">My Wishlist</a></li>
//           </ul>
//         </div>

//         {/* Useful Links */}
//         <div>
//           <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:underline">Our Story</a></li>
//             <li><a href="#" className="hover:underline">Visit Our Store</a></li>
//             <li><a href="#" className="hover:underline">Contact Us</a></li>
//             <li><a href="#" className="hover:underline">About Us</a></li>
//             <li><a href="#" className="hover:underline">Account</a></li>
//           </ul>
//         </div>

//         {/* Email Signup */}
//         <div>
//           <h3 className="font-semibold text-lg mb-4">Sign Up for Email</h3>
//           <p className="text-gray-300 mb-4">Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
//           <div className="space-y-3">
//             <input type="email" placeholder="Enter email address" className="w-full px-4 py-2 rounded-2xl bg-gray-800 text-white focus:outline-none" />
//             <button className="w-full bg-gray-800 hover:bg-white hover:text-black transition text-white px-4 py-2 rounded-2xl font-semibold">Subscribe</button>
//           </div>
//           <div className="flex gap-3 mt-4 text-sm text-gray-400">
//             <span>VND</span>
//             <span>English</span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//         <p className="text-gray-400 text-sm">© 2025 Ecomus. All rights reserved.</p>
//         <div className="flex gap-3 text-3xl text-gray-400">
//           <FaCcVisa />
//           <FaCcPaypal />
//           <FaCcMastercard />
//           <FaCcAmex />
//           <FaCcDiscover />
//         </div>
//       </div>
//     </footer>
//   );
// }
// export default Footer;
import React from "react";

import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaCcVisa, FaCcPaypal, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="container-fluid">
        <div className="grid">
          {/* Company Info */}
          <div className="brand">
            <h2>Eyecore</h2>
            <p>1234 Fashion Street, Suite 567,<br/>New York, NY</p>
            <p><strong>info@fashionshop.com</strong></p>
            <p><strong>(212) 555-1234</strong></p>
            <p className="cta">Get direction →</p>
            <div className="socials">
              <a className="social-btn" href="#" aria-label="Facebook"><FaFacebookF/></a>
              <a className="social-btn" href="#" aria-label="X"><FaXTwitter/></a>
              <a className="social-btn" href="#" aria-label="Instagram"><FaInstagram/></a>
              <a className="social-btn" href="#" aria-label="TikTok"><FaTiktok/></a>
              <a className="social-btn" href="#" aria-label="Pinterest"><FaPinterestP/></a>
            </div>
          </div>

          {/* Help */}
          <div className="section">
            <h3>Help</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Returns + Exchanges</li>
              <li>Shipping</li>
              <li>Terms & Conditions</li>
              <li>FAQ’s</li>
              <li>Compare</li>
              <li>My Wishlist</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="section">
            <h3>Useful Links</h3>
            <ul>
              <li>Our Story</li>
              <li>Visit Our Store</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Account</li>
            </ul>
          </div>

          {/* Email Signup */}
          <div className="section signup">
            <h3>Sign Up for Email</h3>
            <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
            <div className="input-row">
              <input className="email" type="email" placeholder="Enter email address"/>
              <button className="btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bottom">
          <p className="muted">© 2025 Ecomus. All rights reserved.</p>
          <div className="payments">
            <FaCcVisa/><FaCcPaypal/><FaCcMastercard/><FaCcAmex/><FaCcDiscover/>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
export default Footer;