import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import Dashboard from './Dashboard'; // Import the new Dashboard component

// Your Firebase configuration (REPLACE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyBwwxtfVX0hEiQE5vkn0tJlLRRjYIedN4c",
  authDomain: "etobicokebusinessconsulting.firebaseapp.com",
  projectId: "etobicokebusinessconsulting",
  storageBucket: "etobicokebusinessconsulting.firebasestorage.app",
  messagingSenderId: "884503529620",
  appId: "1:884503529620:web:740a557971be48bf2d0c81"
};

// Initialize Firebase services outside the component to avoid re-initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Main App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState('client');
  const [signupMessage, setSignupMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      const role = 'client'; // Placeholder: replace with actual role fetching from Firestore

      setIsLoggedIn(true);
      setUserRole(role);
      setLoginMessage('Login successful!');
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginMessage(`Login failed: ${error.message}`);
    }
  };

  // If the user is logged in, render the Dashboard component
  if (isLoggedIn) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />;
  }

  // Otherwise, render the main marketing site with login/signup forms
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50 rounded-b-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <a href="#hero" className="text-2xl font-bold text-blue-700 mb-2 md:mb-0">Etobicoke Business Consulting</a>
          <div className="space-x-4">
            <a href="#contact" className="text-gray-600 hover:text-blue-700 transition duration-300">Contact</a>
            <a href="#aboutUs" className="text-gray-600 hover:text-blue-700 transition duration-300">About Us</a>
            <a href="#ourExpertise" className="text-gray-600 hover:text-blue-700 transition duration-300">Our Expertise</a>
            <a href="#login" className="text-gray-600 hover:text-blue-700 transition duration-300">Login</a>
            <a href="#signup" className="text-gray-600 hover:text-blue-700 transition duration-300">Signup</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-4 text-center rounded-b-xl shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Empowering Small Businesses to Scale Locally and Globally.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Expert consulting in software testing, AI-driven operations, and business growth strategies.
          </p>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className="py-20 px-4 bg-white rounded-lg shadow-inner mx-4 my-8 md:my-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Core Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Strategic Planning</h3>
              <p className="text-gray-700">Crafting clear roadmaps and future-proof strategies to achieve your long-term business goals and ensure sustainable growth.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Operational Efficiency</h3>
              <p className="text-gray-700">Optimizing workflows, processes, and resource allocation to boost productivity, reduce waste, and improve overall performance.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Financial Management</h3>
              <p className="text-gray-700">Expert guidance on budgeting, cash flow optimization, funding strategies, and accurate financial forecasting for robust fiscal health.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Market Expansion</h3>
              <p className="text-gray-700">Identify new market opportunities, develop effective market entry strategies, and craft tailored plans for customer acquisition and retention.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">🛠️</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Digital Transformation</h3>
              <p className="text-gray-700">Guide your business through technological adoption, implement modern solutions, and leverage data to enhance efficiency and competitiveness.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-blue-600 text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Business Growth Coaching</h3>
              <p className="text-gray-700">Personalized mentorship and actionable insights to empower entrepreneurs, leaders, and teams for sustained growth and innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section id="ourExpertise" className="py-20 px-4 bg-blue-700 text-white rounded-lg shadow-lg mx-4 my-8 md:my-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Expertise & Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Market Analysis</h3>
              <p className="opacity-90">Deep-dive research into market trends, competitive landscapes, and consumer behavior to inform robust strategic decisions.</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Financial Modeling</h3>
              <p className="opacity-90">Building precise and dynamic financial models for accurate forecasting, valuation, scenario planning, and investment readiness.</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Project Management</h3>
              <p className="opacity-90">End-to-end management of complex business projects, ensuring on-time, on-budget delivery and high stakeholder satisfaction.</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Business Process Optimization</h3>
              <p className="opacity-90">Identifying bottlenecks, streamlining operations, and implementing solutions for enhanced operational agility, efficiency, and output.</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Risk Assessment & Mitigation</h3>
              <p className="opacity-90">Proactive identification, thorough analysis, and strategic mitigation of potential business risks to safeguard your company's future and assets.</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-md border border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Digital Strategy Development</h3>
              <p className="opacity-90">Formulating comprehensive digital blueprints covering online presence, integrated marketing, e-commerce, and advanced technology adoption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 px-4 bg-gray-50 rounded-lg shadow-inner mx-4 my-8 md:my-12">
        <div className="container mx-auto text-center max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Login</h2>
          {loginMessage && <p className="text-center mb-4 p-2 rounded-md bg-blue-100 text-blue-700">{loginMessage}</p>}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
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
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-20 px-4 bg-gray-50 rounded-lg shadow-inner mx-4 my-8 md:my-12">
        <div className="container mx-auto text-center max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Signup</h2>
          {signupMessage && <p className="text-center mb-4 p-2 rounded-md bg-blue-100 text-blue-700">{signupMessage}</p>}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
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
                  {/* <option value="admin">Admin</option> */}
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-lg">
                Signup
              </button>
            </form>
          </div>
        </div>
      </section>

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

export default App;