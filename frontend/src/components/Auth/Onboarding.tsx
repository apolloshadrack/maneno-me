import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    phone: '',
    country: 'Kenya',
    languages: [] as string[],
    interests: [] as string[],
    experience: '',
    goals: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const countries = [
    'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'South Sudan', 'Ethiopia', 'Somalia'
  ]

  const languages = [
    'Swahili', 'Kikuyu', 'Luo', 'Kalenjin', 'Luhya', 'Kamba', 'Kisii', 'Meru',
    'Turkana', 'Maasai', 'Samburu', 'Pokot', 'Taita', 'Mijikenda', 'Giriama',
    'English', 'French', 'Arabic', 'Portuguese', 'Other'
  ]

  const interests = [
    'Language Preservation', 'Community Building', 'Cultural Heritage', 'Education',
    'Technology', 'Research', 'Translation', 'Voice Recording', 'Storytelling'
  ]

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
    setError('')
  }

  const handleArrayChange = (field: 'languages' | 'interests') => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user data in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...formData,
        onboardingComplete: true
      }))
      
      // Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to complete onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="onboarding-step">
      <h2>Let's Get Started</h2>
      <p>Tell us a bit about yourself to personalize your experience</p>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          placeholder="+254 700 000 000"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          className="input"
          required
        />
        <small className="form-help">We'll use this to send you important updates</small>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          value={formData.country}
          onChange={handleInputChange('country')}
          className="input"
          required
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="onboarding-step">
      <h2>Your Languages</h2>
      <p>Which languages do you speak? Select all that apply</p>
      
      <div className="checkbox-grid">
        {languages.map(language => (
          <label key={language} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.languages.includes(language)}
              onChange={() => handleArrayChange('languages')(language)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-text">{language}</span>
          </label>
        ))}
      </div>
      
      {formData.languages.length === 0 && (
        <small className="form-help">Please select at least one language</small>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="onboarding-step">
      <h2>Your Interests</h2>
      <p>What aspects of language preservation interest you most?</p>
      
      <div className="checkbox-grid">
        {interests.map(interest => (
          <label key={interest} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.interests.includes(interest)}
              onChange={() => handleArrayChange('interests')(interest)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-text">{interest}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="onboarding-step">
      <h2>Your Goals</h2>
      <p>Help us understand what you hope to achieve</p>
      
      <div className="form-group">
        <label htmlFor="experience">Experience Level</label>
        <select
          id="experience"
          value={formData.experience}
          onChange={handleInputChange('experience')}
          className="input"
          required
        >
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner - New to language preservation</option>
          <option value="intermediate">Intermediate - Some experience</option>
          <option value="advanced">Advanced - Experienced contributor</option>
          <option value="expert">Expert - Professional linguist</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="goals">What are your goals?</label>
        <textarea
          id="goals"
          placeholder="Tell us what you hope to achieve with Maneno..."
          value={formData.goals}
          onChange={handleInputChange('goals')}
          className="input textarea"
          rows={4}
        />
      </div>
    </div>
  )

  const steps = [
    { title: 'Contact Info', component: renderStep1 },
    { title: 'Languages', component: renderStep2 },
    { title: 'Interests', component: renderStep3 },
    { title: 'Goals', component: renderStep4 },
  ]

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.phone && formData.country
      case 2:
        return formData.languages.length > 0
      case 3:
        return true // Interests are optional
      case 4:
        return formData.experience
      default:
        return false
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11H11C9.9 11 9 10.1 9 9V7.5L3 7V9C3 10.1 3.9 11 5 11H7V22H9V16H15V22H17V11H19C20.1 11 21 10.1 21 9Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Maneno</h1>
            </div>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-card onboarding-card">
            <div className="onboarding-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`progress-step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
                  >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-title">{step.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div className="onboarding-content">
              {steps[currentStep - 1].component()}
            </div>

            <div className="onboarding-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                  disabled={!canProceed()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={!canProceed() || loading}
                >
                  {loading ? 'Completing...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
