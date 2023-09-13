import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '../firebase/firebase';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuth() {
  function authGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('token ===', token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('errorMessage ===', errorMessage);
      });
  }

  return (
    <>
      <button onClick={authGoogle}>
        <FcGoogle size={40} />
      </button>
    </>
  );
}
