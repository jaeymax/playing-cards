// import React, { useState } from "react";

// const SignupForm = () => {
//   // State to track current step and form data
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     birthdate: "",
//     avatar: "",
//     preferredCardStyle: "classic",
//     notifications: true,
//     termsAccepted: false,
//   });
//   const [errors, setErrors] = useState({});

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   // Validate current step
//   const validateStep = () => {
//     let stepErrors = {};
//     let isValid = true;

//     if (currentStep === 1) {
//       if (!formData.email) {
//         stepErrors.email = "Email is required";
//         isValid = false;
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         stepErrors.email = "Email is invalid";
//         isValid = false;
//       }

//       if (!formData.username) {
//         stepErrors.username = "Username is required";
//         isValid = false;
//       } else if (formData.username.length < 3) {
//         stepErrors.username = "Username must be at least 3 characters";
//         isValid = false;
//       }
//     }

//     if (currentStep === 2) {
//       if (!formData.password) {
//         stepErrors.password = "Password is required";
//         isValid = false;
//       } else if (formData.password.length < 8) {
//         stepErrors.password = "Password must be at least 8 characters";
//         isValid = false;
//       }

//       if (formData.password !== formData.confirmPassword) {
//         stepErrors.confirmPassword = "Passwords do not match";
//         isValid = false;
//       }

//       if (!formData.birthdate) {
//         stepErrors.birthdate = "Birth date is required";
//         isValid = false;
//       }
//     }

//     if (currentStep === 3) {
//       if (!formData.termsAccepted) {
//         stepErrors.termsAccepted = "You must accept the terms to continue";
//         isValid = false;
//       }
//     }

//     setErrors(stepErrors);
//     return isValid;
//   };

//   // Go to next step
//   const nextStep = () => {
//     if (validateStep()) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   // Go to previous step
//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateStep()) {
//       // Here you would typically send the data to your backend
//       console.log("Form submitted:", formData);
//       alert("Signup successful! Welcome to the game!");
//       // Redirect to game tutorial or dashboard
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Join the Ultimate Card Battle
//         </h1>

//         {/* Progress indicator */}
//         <div className="flex justify-between mb-8">
//           <div
//             className={`h-2 w-1/3 rounded-l-full ${
//               currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></div>
//           <div
//             className={`h-2 w-1/3 ${
//               currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></div>
//           <div
//             className={`h-2 w-1/3 rounded-r-full ${
//               currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></div>
//         </div>

//         <form onSubmit={currentStep === 3 ? handleSubmit : nextStep}>
//           {/* Step 1: Account Info */}
//           {currentStep === 1 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Create Your Account</h2>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red-600">{errors.username}</p>
//                 )}
//                 <p className="mt-1 text-xs text-gray-500">
//                   This will be your display name during gameplay
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Security and Personal Info */}
//           {currentStep === 2 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Security & Details</h2>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Birth Date
//                 </label>
//                 <input
//                   type="date"
//                   name="birthdate"
//                   value={formData.birthdate}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {errors.birthdate && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.birthdate}
//                   </p>
//                 )}
//                 <p className="mt-1 text-xs text-gray-500">
//                   You must be 13+ to play
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Preferences and Agreement */}
//           {currentStep === 3 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Game Preferences</h2>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Select Avatar Style
//                 </label>
//                 <select
//                   name="avatar"
//                   value={formData.avatar}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select an avatar style</option>
//                   <option value="warrior">Warrior</option>
//                   <option value="mage">Mage</option>
//                   <option value="rogue">Rogue</option>
//                   <option value="custom">Custom (Upload Later)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Card Style
//                 </label>
//                 <div className="mt-2 space-y-2">
//                   <div className="flex items-center">
//                     <input
//                       id="classic"
//                       name="preferredCardStyle"
//                       type="radio"
//                       value="classic"
//                       checked={formData.preferredCardStyle === "classic"}
//                       onChange={handleChange}
//                       className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                     />
//                     <label
//                       htmlFor="classic"
//                       className="ml-3 block text-sm font-medium text-gray-700"
//                     >
//                       Classic
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       id="modern"
//                       name="preferredCardStyle"
//                       type="radio"
//                       value="modern"
//                       checked={formData.preferredCardStyle === "modern"}
//                       onChange={handleChange}
//                       className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                     />
//                     <label
//                       htmlFor="modern"
//                       className="ml-3 block text-sm font-medium text-gray-700"
//                     >
//                       Modern
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       id="fantasy"
//                       name="preferredCardStyle"
//                       type="radio"
//                       value="fantasy"
//                       checked={formData.preferredCardStyle === "fantasy"}
//                       onChange={handleChange}
//                       className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                     />
//                     <label
//                       htmlFor="fantasy"
//                       className="ml-3 block text-sm font-medium text-gray-700"
//                     >
//                       Fantasy
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="notifications"
//                     name="notifications"
//                     type="checkbox"
//                     checked={formData.notifications}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label
//                     htmlFor="notifications"
//                     className="font-medium text-gray-700"
//                   >
//                     Game Notifications
//                   </label>
//                   <p className="text-gray-500">
//                     Receive updates about tournaments, new cards, and game
//                     events
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms"
//                     name="termsAccepted"
//                     type="checkbox"
//                     checked={formData.termsAccepted}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label htmlFor="terms" className="font-medium text-gray-700">
//                     Terms and Conditions
//                   </label>
//                   <p className="text-gray-500">
//                     I agree to the Terms of Service and Privacy Policy
//                   </p>
//                   {errors.termsAccepted && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.termsAccepted}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation buttons */}
//           <div className="mt-8 flex justify-between">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Back
//               </button>
//             )}
//             {currentStep < 3 ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="ml-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Continue
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="ml-auto bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 Create Account
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
