import React from 'react';
import { auth } from '../../firebaseConfig';  // Import the auth object
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage = ({ onClose, setIsLoggedIn }) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      setIsLoggedIn(true);  // Update login state in Navbar
      onClose();  // Close the login modal
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  // Directly trigger Google Sign-In when the component renders
  React.useEffect(() => {
    handleGoogleSignIn();
  }, []);

  return null;  // No need to render anything, as authentication happens immediately
};

export default LoginPage;
