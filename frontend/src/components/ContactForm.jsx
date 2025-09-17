import axios from 'axios';
import React, { useState } from 'react';

const ContactForm = () => {
  // Separate states for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const backendURL = "http://127.0.0.1:8000"

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
    if (errors.details) {
      setErrors(prev => ({ ...prev, details: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!details.trim()) {
      newErrors.details = 'Details are required';
    } else if (details.length < 10) {
      newErrors.details = 'Please provide more details (min 10 characters)';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // In a real application, you would send the data to your backend here
    // console.log('Form submitted with:', { name, email, phone, details });
    
    await axios.post(`${backendURL}/form`, {
        "details" : details,
        "phone" : phone,
        "name" : name,
        "email" : email
    }).then((response) => {
        console.log(response.data);
    })
    try {
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
      setErrors({});
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '28rem'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '1.5rem', 
          textAlign: 'center' 
        }}>
          Contact Form
        </h2>
        
        {isSubmitted && (
          <div style={{
            backgroundColor: '#d1fae5',
            border: '1px solid #10b981',
            color: '#065f46',
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}>
            Form submitted successfully!
          </div>
        )}

        {errors.submit && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #ef4444',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                outline: 'none',
                boxShadow: errors.name ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : 'none'
              }}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                outline: 'none',
                boxShadow: errors.email ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : 'none'
              }}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.phone ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                outline: 'none',
                boxShadow: errors.phone ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : 'none'
              }}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</p>
            )}
          </div>

          {/* Details Field */}
          <div>
            <label htmlFor="details" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Details *
            </label>
            <textarea
              id="details"
              name="details"
              value={details}
              onChange={handleDetailsChange}
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.details ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                outline: 'none',
                boxShadow: errors.details ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : 'none'
              }}
              placeholder="Please provide details about your inquiry..."
            />
            {errors.details && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.details}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Submit Form
          </button>
        </form>

        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem', textAlign: 'center' }}>
          * indicates required field
        </p>
      </div>
    </div>
  );
};

export default ContactForm;