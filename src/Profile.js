import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = ({ auth, db }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        // Pre-populate email from Firebase Auth
        setEmail(auth.currentUser.email);

        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || '');
          setPhone(userData.phone || '');
          setSecurityQuestion(userData.securityQuestion || '');
          setSecurityAnswer(userData.securityAnswer || '');
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [auth, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!auth.currentUser) {
      setMessage('You must be logged in to update your profile.');
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name: name,
        phone: phone,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
      });

      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(`Failed to update profile: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center text-gray-500 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">User Profile</h2>
        {message && <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-left text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-left text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="securityQuestion" className="block text-left text-gray-700 text-sm font-semibold mb-2">Security Question</label>
            <input
              type="text"
              id="securityQuestion"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="securityAnswer" className="block text-left text-gray-700 text-sm font-semibold mb-2">Security Answer</label>
            <input
              type="text"
              id="securityAnswer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-left text-gray-700 text-sm font-semibold mb-2">Resume (PDF, DOCX)</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
