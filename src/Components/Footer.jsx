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
            <FaFacebookF/>
            <FaXTwitter/>
            <FaInstagram/>
            <FaTiktok/>           
            <FaPinterestP/>
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