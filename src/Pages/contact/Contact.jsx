
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import './Contact.css';
import contact1 from "./../../assets/images/contact1.png"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="contact-page">
      
      <section className="hero-split-wrapper">
 <div className="hero-text-side">
    <h1>We See Things Differently</h1>
    <p>Eyecore was born from a simple idea: that eyewear should be an extension of your personality, not just a medical necessity.</p>
  </div> 
  <div className="hero-image-side">
    <img src={contact1} alt="Design sketches" />
  </div>
 
</section>

      <div className="contact-container">
        <div className="contact-layout">
          
          <div className="contact-info">
            <h2 className="section-title">Visit Our Studio</h2>
            <p className="info-desc">
              Experience our collection in person. Our stylists are ready to help you find your perfect fit.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="icon-box"><MapPin size={20} /></div>
                <div>
                  <h4>Headquarters</h4>
                  <p>123 Fashion Avenue, Suite 400<br />New York, NY 10012</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><Mail size={20} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@eyecore.com<br />support@eyecore.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><Phone size={20} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (555) 019-2834<br />Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <span>Follow Us</span>
              <div className="social-icons">
                <Instagram size={20} />
                <Facebook size={20} />
                <Twitter size={20} />
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Jane Doe"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. jane@example.com"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="press">Press & Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="How can we help you?"
                  required 
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;