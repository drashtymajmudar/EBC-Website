import React, { useState } from 'react';

const Dashboard = ({ userRole, onLogout }) => {
  const [activeDashboardView, setActiveDashboardView] = useState('profile');

  // Function to handle smooth scrolling for navigation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send data to Firebase Firestore
    console.log("Profile form submitted!");
    alert("Profile saved successfully!"); // Added for user feedback
  };

  const ProfileForm = () => {
    return (
      <form onSubmit={handleProfileFormSubmit} className="space-y-6 text-left max-w-md mx-auto">
        <div className="flex justify-center">
          <button type="submit" className="w-fit bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300">
            Submit Profile
          </button>
        </div>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
          <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* Security Questions */}
        <div>
          <label htmlFor="security-question-1" className="block text-sm font-semibold text-gray-700">Security Question 1</label>
          <input type="text" id="security-question-1" name="security-question-1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="security-question-2" className="block text-sm font-semibold text-gray-700">Security Question 2</label>
          <input type="text" id="security-question-2" name="security-question-2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* Resume */}
        <div>
          <label htmlFor="resume" className="block text-sm font-semibold text-gray-700">Resume</label>
          <input type="file" id="resume" name="resume" className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
        </div>
      </form>
    );
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50 rounded-b-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <a href="#" className="text-2xl font-bold text-blue-700 mb-2 md:mb-0">Etobicoke Business Consulting</a>
          <div className="space-x-4">
            {userRole === 'admin' && (
              <a href="#adminDashboard" onClick={() => scrollToSection('adminDashboard')} className="text-gray-600 hover:text-blue-700 transition duration-300">Admin Dashboard</a>
            )}
            {userRole === 'client' && (
              <>
                <a href="#profile" onClick={() => setActiveDashboardView('profile')} className={`hover:text-blue-700 transition duration-300 ${activeDashboardView === 'profile' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>Profile</a>
                <a href="#payment" onClick={() => setActiveDashboardView('payment')} className={`hover:text-blue-700 transition duration-300 ${activeDashboardView === 'payment' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>Payment</a>
              </>
            )}
            <button onClick={onLogout} className="text-gray-600 hover:text-blue-700 transition duration-300">Logout</button>
          </div>
        </div>
      </nav>

      {/* Client Dashboard section with conditional content */}
      <section id="clientDashboard" className="py-20 px-4 bg-gray-50 rounded-lg shadow-inner mx-4 my-8 md:my-12">
        <div className="container mx-auto text-center max-w-3xl">
          {activeDashboardView === 'profile' && (
            <div id="profile-view">
              <ProfileForm />
            </div>
          )}
          {activeDashboardView === 'payment' && (
            <div id="payment-view">
              <h2 className="text-4xl font-bold text-gray-800 mb-12">Payment History and Options</h2>
              <p className="text-lg text-gray-700">This is where the user's payment history and options would be displayed.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 text-center rounded-t-lg mt-8">
        <div className="container mx-auto">
          <p>&copy; 2024 Etobicoke Business Consulting. All rights reserved.</p>
          <p className="mt-2 text-sm opacity-80">
            Strategic Insights. Tangible Results. Your Success.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;