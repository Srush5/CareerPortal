export const validateApplication = (values) => {
  let errors = {};

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = "Only characters are allowed";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = "Only characters are allowed";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  const mobileRegex = /^\d{10}$/;
  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(values.mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits";
  }

  if (!values.experience) errors.experience = "Experience is required";
  if (!values.currentCompany)
    errors.currentCompany = "Current company is required";
  if (!values.currentCTC) errors.currentCTC = "Current CTC is required";
  if (!values.expectedCTC) errors.expectedCTC = "Expected CTC is required";
  if (!values.noticePeriod) errors.noticePeriod = "Notice period is required";

  if (!values.resume) {
    errors.resume = "Resume is required";
  } else {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(values.resume.type)) {
      errors.resume = "Only PDF or Word documents are allowed";
    } else if (values.resume.size > 2 * 1024 * 1024) {
      errors.resume = "File size must be less than 2MB";
    }
  }

  return errors;
};
