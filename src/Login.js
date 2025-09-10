import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ auth, db, onLoginSuccess, setCurrentView }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      let role = 'client';
      if (docSnap.exists()) {
        role = docSnap.data().role;
      }

      onLoginSuccess(role);
      setLoginMessage('Login successful!');
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginMessage(`Login failed: ${error.message}`);
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
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Login</h2>
          {loginMessage && <p className="text-center mb-4 p-2 rounded-md bg-blue-100 text-blue-700">{loginMessage}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="loginEmail" className="block text-left text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-left text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-lg">
              Login
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

export default Login;