import React from 'react'
import { Heart, Users, Zap, Accessibility, Globe, Mic, Brain } from 'lucide-react'
import './About.css'

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
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
              <a href="/about" className="nav-link active">About</a>
              <a href="/contact" className="nav-link">Contact</a>
              <div className="nav-actions">
                <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Join us</a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                About <span className="hero-title-accent">Maneno</span>
              </h1>
              <p className="hero-description">
                We're on a mission to preserve and celebrate Africa's linguistic diversity through technology, 
                community, and innovation.
              </p>
            </div>
            <div className="hero-image">
              <img 
                src="/aboutmaneno.png" 
                alt="Diverse community members celebrating African languages and culture"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="about-story">
                <h2>Our Story</h2>
                <p>
                  Founded in 2024, Maneno was born from a simple yet profound realization: every time a language 
                  disappears, we don't just lose words—we lose entire worlds of wisdom, culture, and human experience. 
                  With over 2,000 languages spoken across Africa, and many at risk of extinction, we knew we had to act.
                </p>
                <p>
                  Our platform combines cutting-edge AI technology with deep community engagement to create a 
                  sustainable ecosystem for language preservation. We're not just building software; we're building 
                  bridges between generations, between communities, and between the past and the future.
                </p>
              </div>

              <div className="about-mission">
                <h2>Our Mission</h2>
                <p>
                  To ensure that no African language is left behind. We empower communities to preserve their 
                  linguistic heritage through accessible technology, collaborative tools, and meaningful connections.
                </p>
              </div>

              <div className="about-values">
                <h2>Our Values</h2>
                <div className="values-grid">
                  <div className="value-item">
                    <div className="value-icon">
                      <Heart size={32} />
                    </div>
                    <h3>Cultural Respect</h3>
                    <p>We honor the sovereignty of each community over their linguistic heritage.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">
                      <Users size={32} />
                    </div>
                    <h3>Community First</h3>
                    <p>Every decision we make puts the needs and voices of communities at the center.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">
                      <Zap size={32} />
                    </div>
                    <h3>Scientific Rigor</h3>
                    <p>We combine traditional knowledge with cutting-edge research and technology.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">
                      <Accessibility size={32} />
                    </div>
                    <h3>Accessibility</h3>
                    <p>Language preservation should be accessible to everyone, regardless of technical expertise.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-highlight">
                <div className="stat-number">2,000+</div>
                <div className="stat-label">African Languages</div>
                <div className="stat-description">Supported across the continent</div>
              </div>
              <div className="stat-highlight">
                <div className="stat-number">50+</div>
                <div className="stat-label">Kenyan Languages</div>
                <div className="stat-description">Starting with our home country</div>
              </div>
              <div className="stat-highlight">
                <div className="stat-number">100%</div>
                <div className="stat-label">Community Owned</div>
                <div className="stat-description">Data sovereignty for every community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Mission</h2>
            <p className="cta-description">
              Every voice matters, every word counts. Help us preserve Africa's linguistic diversity 
              for future generations.
            </p>
            <div className="cta-actions">
              <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                Join us
              </a>
              <button className="btn btn-outline btn-lg">
                Learn More
              </button>
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

export default About