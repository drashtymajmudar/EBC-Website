import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({ auth, db, setCurrentView }) => {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState('client');
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: signupName,
        role: signupRole,
        createdAt: new Date(),
      });

      setSignupMessage('Registration successful! You can now log in.');
      setSignupEmail('');
      setSignupPassword('');
      setSignupName('');
    } catch (error) {
      console.error("Error during signup:", error.message);
      setSignupMessage(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50 rounded-b-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <a href="#" className="text-2xl font-bold text-blue-700 mb-2 md:mb-0" onClick={() => setCurrentView('home')}>Etobicoke Business Consulting</a>
          <div className="space-x-4">
            <a href="#" onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-blue-700 transition duration-300">Contact</a>
            <a href="#" onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-blue-700 transition duration-300">About Us</a>
            <a href="#" onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-blue-700 transition duration-300">Our Expertise</a>
            <a href="#" onClick={() => setCurrentView('login')} className="text-gray-600 hover:text-blue-700 transition duration-300">Login</a>
            <a href="#" onClick={() => setCurrentView('signup')} className="text-gray-600 hover:text-blue-700 transition duration-300">Signup</a>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Signup</h2>
          {signupMessage && <p className="text-center mb-4 p-2 rounded-md bg-blue-100 text-blue-700">{signupMessage}</p>}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="signupName" className="block text-left text-gray-700 text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                id="signupName"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="signupEmail" className="block text-left text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="signupEmail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="signupPassword" className="block text-left text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                id="signupPassword"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="signupRole" className="block text-left text-gray-700 text-sm font-semibold mb-2">Role</label>
              <select
                id="signupRole"
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="client">Client</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-lg">
              Signup
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 text-center rounded-t-lg">
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

export default Signup;