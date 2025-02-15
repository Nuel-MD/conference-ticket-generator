import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProgressBar from './ProgressBar';
import './MultiSteps.css';
import cloud from '../assets/cloud.svg'
const MultiSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketData, setTicketData] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const steps = 3;

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const onSubmit = (data) => {
    if (currentStep === 1 && !ticketType) {
      alert('Please select a ticket type before proceeding.');
      return;
    }
  
    // Collect data from current step
    const stepData = currentStep === 1 
      ? { ticketType, ticketQuantity } 
      : { ...data, profilePhoto };
  
    // Update ticketData with accumulated data
    setTicketData(prev => ({
      ...prev,
      ...stepData,
      eventName: "Techember Fest '25", // Add static event data
      eventLocation: "📍 [Event Location] March 15, 2025 | 7:00 PM"
    }));
  
    currentStep === steps ? handleFinalSubmit() : handleNextStep();
  };

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'HNG12_stage2_project_preset'); // Use your Cloudinary upload preset
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dhspwfrlk/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setProfilePhoto(data.secure_url); // Set Cloudinary URL directly
    } catch (err) {
      console.error('Image upload failed', err);
    }
  }
};

  
  return (
    <div className="multi-steps">
      <div className="form-container">
        <div className="form-header">
        <h2>
          {currentStep === 1 && 'Ticket Selection'}
          {currentStep === 2 && 'Attendee Details'}
          {currentStep === 3 && 'Your Ticket is Booked!'}
        <span className='step-count'>Step {currentStep}/{steps}</span>

        </h2>
        <ProgressBar currentStep={currentStep} totalSteps={steps} />
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div >
              <div className='event-info-container'>
                <div className='event-info-content'>
                <h3>Techember Fest '25</h3>
                <p className="event-info">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
                </div>
              
              <div className="event-location">📍 [Event Location]<span>March 15, 2025 | 7:00 PM</span></div>

              </div>
              <div className='progress-container'></div> 
              <div className="ticket-selection">
                <label>Select Ticket Type:</label>
                <div className="ticket-options">
                <div
                  className={`ticket-option ${ticketType === 'free' ? 'selected' : ''}`}
                  onClick={() => setTicketType('free')}
                >
             <div>free</div>
                  <div>
                  <p className='access'>REGULAR ACCESS</p>
                  <p className='quantity'>20/52</p>
                  </div>

                </div>

                <div
                  className={`ticket-option ${ticketType === 'vip' ? 'selected' : ''}`}
                  onClick={() => setTicketType('vip')}
                >
                 <div>$150</div>
                  <div>
                  <p className='access'>VIP Access</p>
                  <p className='quantity'>20/52</p>
                  </div>
                </div>

                <div
                  className={`ticket-option ${ticketType === 'vvip' ? 'selected' : ''}`}
                  onClick={() => setTicketType('vvip')}
                >
                 <div>$150</div>
                  <div>
                  <p className='access'>VVIP Access</p>
                  <p className='quantity'>20/52</p>
                  </div>

                </div>
                </div>

              </div>

              <div className='ticket-quantity'>
  <label>Number of Tickets</label>
  <select 
    {...register('ticketQuantity')} 
    value={ticketQuantity} 
    onChange={(e) => setTicketQuantity(e.target.value)}
  >
    {[1, 2, 3, 4, 5].map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>
</div>

              <div className='ticket-actions'>
                <button type="button" onClick={handlePrevStep} disabled={currentStep === 1}>
                  Cancel
                </button>
                <button type="submit" disabled={!ticketType}>
                   {currentStep === steps ? 'Generate Ticket' : 'Next'}
                   </button>

              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className='uploader'>
<div className="upload-container">
  <div>Upload Profile Photo</div>
  <div className="upload-background">
    <div className="profile-photo">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="profile-photo-upload"
      />
      <label htmlFor="profile-photo-upload" className="upload-box">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt="Profile"
            className="profile-img" // Style the Cloudinary URL here
          />
        ) : (
          <div>
            <img src={cloud} alt="cloud image"/>
            <p>Drag & Drop or Click to Upload</p>
          </div>
        )}
      </label>
    </div>
  </div>
</div>

              <div className='progress-container'></div> 

              <div className='name'>
                <label>Enter your Name</label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full Name is required*' })}
                />
                {errors.fullName && <p>{errors.fullName.message}</p>}
              </div>

              <div className='email'>
                <label>Enter your email*</label>
                <div className='input-container'>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { required: 'Email is required' })}
                />
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="white"/>
</svg>                
                {errors.email && <p>{errors.email.message}</p>}
                </div>

              </div>

              <div className='special-request'>
                <label>About the project</label>
                <textarea
                  placeholder="Textarea"
                  {...register('specialRequest')}
                />
              </div>

              <div className='ticket-actions'>
  <button 
    type="submit" 
    disabled={currentStep === 1 && !ticketType} // Disable if no ticket type is selected in the first step
  >
    {currentStep === steps ? 'Get My Free Ticket' : 'Next'}
  </button>
  <button 
    type="button" 
    onClick={handlePrevStep} 
    disabled={currentStep === 1}
  >
    Back
  </button>
</div>

            </div>
          )}

          {currentStep === 3 && ticketData && (
            <div>
              <div className="ticket">
                <h3>{ticketData.eventName}</h3>
                <p>{ticketData.eventLocation}</p>
                <img src={ticketData.profilePhoto} alt="Profile" className="ticket-avatar" />
                <p>Name: {ticketData.fullName}</p>
                <p>Email: {ticketData.email}</p>
                <p>Ticket Type: {ticketData.ticketType}</p>
                <p>Quantity: {ticketData.ticketQuantity}</p>
                <div className="barcode">[Barcode Image Here]</div>
              </div>

              <div className='ticket-actions'>
              <button onClick={() => setTicketData(null)}>Book Another Ticket</button>
              <button onClick={() => window.print()}>Download Ticket</button>

              </div>
              
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiSteps;
