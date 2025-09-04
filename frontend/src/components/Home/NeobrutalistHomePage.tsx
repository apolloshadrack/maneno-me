import React, { useState, useEffect } from 'react'
import { Mic, Users, TrendingUp, Smartphone, Globe, Brain, Heart, Shield, Zap, Accessibility } from 'lucide-react'
import './NeobrutalistHomePage.css'

const NeobrutalistHomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const stats = [
    { number: '50+', label: 'African Languages', color: 'african-yellow' },
    { number: '10K+', label: 'Voice Recordings', color: 'african-red' },
    { number: '25K+', label: 'Translations', color: 'african-green' },
    { number: '1.2K+', label: 'Contributors', color: 'kente-gold' },
  ]

  const features = [
    {
      icon: <Mic size={48} />,
      title: 'Capture Every Voice',
      description: 'Record stories, songs, and conversations in their purest form. Every voice matters, every word counts.',
      color: 'african-yellow',
    },
    {
      icon: <Users size={48} />,
      title: 'Community-Powered',
      description: 'Built by the people, for the people. Local communities lead the preservation of their own languages.',
      color: 'african-red',
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'See the Impact',
      description: 'Watch your contributions grow into something beautiful. Track progress, celebrate milestones, measure real change.',
      color: 'african-green',
    },
    {
      icon: <Smartphone size={48} />,
      title: 'Works Everywhere',
      description: 'No internet? No problem. Capture language data anywhere, sync when you can. Technology that adapts to reality.',
      color: 'kente-purple',
    },
    {
      icon: <Globe size={48} />,
      title: 'Speak Your Language',
      description: 'Use our platform in your own language. Because preserving languages shouldn\'t require learning another one.',
      color: 'kente-orange',
    },
    {
      icon: <Brain size={48} />,
      title: 'AI That Understands',
      description: 'Technology that doesn\'t just translate words, but understands culture, context, and the soul of each language.',
      color: 'kente-gold',
    },
  ]

  const testimonials = [
    {
      name: 'Mama Grace',
      role: 'Elder, Luo Community',
      content: 'For the first time, my grandchildren can hear our stories in our own language. They\'re not just learning words—they\'re learning who they are.',
      avatar: 'MG',
    },
    {
      name: 'Dr. Amina Okafor',
      role: 'Linguistics Professor, University of Nairobi',
      content: 'This isn\'t just technology—it\'s hope. We\'re not just preserving languages; we\'re preserving the wisdom of generations.',
      avatar: 'AO',
    },
    {
      name: 'James Mwangi',
      role: 'Community Leader, Kikuyu Language',
      content: 'Our language was dying. Now, thanks to Maneno, our children are speaking it again. We\'ve brought our culture back to life.',
      avatar: 'JM',
    },
  ]

  const faqs = [
    {
      question: 'How accurate are the AI translations?',
      answer: 'Our AI models achieve 85-95% accuracy depending on the language pair and context. We continuously improve through community feedback and expert validation.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we use enterprise-grade security measures and give communities full control over their linguistic data. Your privacy and cultural sovereignty are our top priorities.',
    },
    {
      question: 'Can I contribute without technical expertise?',
      answer: 'Absolutely! You can contribute by recording voice samples, providing translations, or simply sharing your language knowledge. Our platform is designed for everyone.',
    },
    {
      question: 'How does offline mode work?',
      answer: 'You can record audio, add text, and work on translations offline. When internet connectivity is restored, your work automatically syncs with the platform.',
    },
  ]

  return (
    <div className="neobrutalist-homepage">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11H11C9.9 11 9 10.1 9 9V7.5L3 7V9C3 10.1 3.9 11 5 11H7V22H9V16H15V22H17V11H19C20.1 11 21 10.1 21 9Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="logo-text">
                <h1>Maneno</h1>
              </div>
            </a>
            <nav className="nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
              <div className="nav-actions">
                <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Join us</a>
              </div>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            
            {/* Mobile Menu */}
            <nav 
              id="mobile-navigation"
              className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
              aria-hidden={!isMobileMenuOpen}
            >
              <a href="/" className="mobile-nav-link touch-target">Home</a>
              <a href="/about" className="mobile-nav-link touch-target">About</a>
              <a href="/contact" className="mobile-nav-link touch-target">Contact</a>
              <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-sm mobile-join-btn touch-target" target="_blank" rel="noopener noreferrer">Join us</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Every Language
                <br />
                <span className="hero-title-accent">Tells a Story</span>
              </h1>
              <p className="hero-description">
                When a language disappears, we don't just lose words—we lose entire worlds of wisdom, 
                culture, and human experience. We're building the technology to ensure that never happens 
                to Africa's 2,000+ languages, starting with Kenya's 50+ languages.
              </p>
              <div className="hero-actions">
                <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-lg touch-target" target="_blank" rel="noopener noreferrer">
                  Join us
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <img 
                  src="/maneno.png" 
                  alt="African community sharing stories and preserving languages"
                  className="hero-img"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Every Voice Matters</h3>
                    <p>Join thousands preserving their languages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-description">
                To ensure that no African language is left behind. We empower communities to preserve their 
                linguistic heritage through accessible technology, collaborative tools, and meaningful connections.
              </p>
              <div className="mission-values">
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
            <div className="mission-stats">
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

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How We Do It</h2>
            <p className="section-description">
              We don't just build technology—we build bridges between generations, 
              between communities, and between the past and the future.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card bg-${feature.color}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section - Hidden */}
      {/* <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-description">
              Join thousands of contributors who are already making a difference
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Everything you need to know about Maneno
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Your Language Matters</h2>
            <p className="cta-description">
              Every voice recorded, every story shared, every word preserved—it all adds up to something 
              extraordinary. Join thousands of people who are already making sure their languages live on.
            </p>
            <div className="cta-actions">
              <a href="https://wa.me/254791814113?text=Hi%20there!%20I%27d%20like%20to%20join%20Maneno%20and%20help%20preserve%20African%20languages." className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                Join us
              </a>
              <button className="btn btn-outline btn-lg">
                Hear the Stories
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
                  <li><a href="#contact">Contact Us</a></li>
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

export default NeobrutalistHomePage
