import React, { useState } from 'react'
import { Mail, MapPin, Phone, MessageCircle, Send } from 'lucide-react'
import './Contact.css'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="contact-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11H11C9.9 11 9 10.1 9 9V7.5L3 7V9C3 10.1 3.9 11 5 11H7V22H9V16H15V22H17V11H19C20.1 11 21 10.1 21 9Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="logo-text">
                <h1>Maneno</h1>
              </div>
            </div>
            <nav className="nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link active">Contact</a>
              <div className="nav-actions">
                <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Join us</a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Get in <span className="hero-title-accent">Touch</span>
              </h1>
              <p className="hero-description">
                Ready to preserve your language? Have questions? We'd love to hear from you.
              </p>
            </div>
            <div className="hero-image">
              <img 
                src="/contact.png" 
                alt="Global communication and diversity - people speaking different languages" 
                className="contact-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Email Us</h3>
                    <p>hello@maneno.me</p>
                    <p>support@maneno.me</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Visit Us</h3>
                    <p>Nairobi, Kenya</p>
                    <p>Westlands, Waiyaki Way</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Call Us</h3>
                    <p>+254 791 814 113</p>
                    <p>Mon-Fri, 9AM-6PM EAT</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <MessageCircle size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Community</h3>
                      <p>Join our Whatsapp</p>
                    <p>Follow us on Instagram</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email"
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="language">Language Community</label>
                    <select 
                      id="language" 
                      name="language" 
                      value={formData.language}
                      onChange={handleInputChange}
                    >
                      <option value="">Select your language community</option>
                      <option value="kikuyu">Kikuyu</option>
                      <option value="luo">Luo</option>
                      <option value="kamba">Kamba</option>
                      <option value="kisii">Kisii</option>
                      <option value="meru">Meru</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your needs or questions..."
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full">
                    <Send size={20} />
                      Send Message
                  </button>
              </form>
              </div>
            </div>

            <div className="contact-cta">
              <h3>Ready to Start Preserving?</h3>
              <p>
                Join thousands of community members who are already preserving their languages. 
                Every voice matters, every word counts.
              </p>
              <div className="contact-actions">
                <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                  Join us
                </a>
                <button className="btn btn-outline btn-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11H11C9.9 11 9 10.1 9 9V7.5L3 7V9C3 10.1 3.9 11 5 11H7V22H9V16H15V22H17V11H19C20.1 11 21 10.1 21 9Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="footer-logo-text">
                  <h3>Maneno</h3>
                </div>
              </div>
              <p className="footer-description">
                Preserving African languages through technology, community, and innovation.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <ul>
                  <li><a href="#voice">Voice Capture</a></li>
                  <li><a href="#translation">Translation</a></li>
                  <li><a href="#analytics">Analytics</a></li>
                  <li><a href="#community">Community</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="#status">Status</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Community</h4>
                <ul>
                  <li><a href="#contributors">Contributors</a></li>
                  <li><a href="#partners">Partners</a></li>
                  <li><a href="#research">Research</a></li>
                  <li><a href="#events">Events</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#data">Data Policy</a></li>
                  <li><a href="#cookies">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Maneno - Preserving African Languages Through Technology</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact