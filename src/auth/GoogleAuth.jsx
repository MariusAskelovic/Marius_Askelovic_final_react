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
        // The signed-in user info.
        const user = result.user;
        console.log('user ===', user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log('errorCode ===', errorCode);
        const errorMessage = error.message;
        console.log('errorMessage ===', errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('credential ===', credential);
        // ...
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
