/**
 * Validates the booking form steps
 * @param {number} step - Current form step
 * @param {object} data - Form data
 * @returns {object} - Error messages
 */
export const validateBookingStep = (step, data) => {
  const errors = {};
  
  if (step === 1) {
    if (!data.title.trim()) errors.title = "Event title is required";
    else if (data.title.trim().length < 5) errors.title = "Must be at least 5 characters";
    
    if (!data.dept.trim()) errors.dept = "Department is required";
    
    if (!data.purpose.trim()) errors.purpose = "Purpose is required";
    else if (data.purpose.trim().length < 20) errors.purpose = "Please elaborate (min 20 characters)";
  }
  
  if (step === 2) {
    if (!data.date) errors.date = "Please select a date";
    else {
      const dt = new Date(data.date), today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dt <= today) errors.date = "Date must be in the future";
    }
    
    if (!data.startTime) errors.startTime = "Please select a start time";
    
    if (!data.duration) errors.duration = "Duration is required";
    else if (parseInt(data.duration) < 1 || parseInt(data.duration) > 8) {
      errors.duration = "Must be between 1 and 8 hours";
    }
  }
  
  if (step === 3) {
    if (data.facilities.length === 0) errors.facilities = "Select at least one facility";
  }
  
  if (step === 4) {
    if (!data.name.trim()) errors.name = "Full name is required";
    
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Enter a valid email address";
    }
    
    if (!data.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{8,}$/.test(data.phone)) {
      errors.phone = "Enter a valid phone number";
    }
  }
  
  return errors;
};
