import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAnzKPgkZ0L7Arx1eaACk4CKyyq1BFzgtw",
	authDomain: "cloth-shopping-db-1d2d7.firebaseapp.com",
	projectId: "cloth-shopping-db-1d2d7",
	storageBucket: "cloth-shopping-db-1d2d7.appspot.com",
	messagingSenderId: "732210706700",
	appId: "1:732210706700:web:83b2d57c0a7596b0f5b129",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	// check if user data exists
	// if user data does not exist
	if (!userSnapshot.exists()) {
		// create / set the document with the data from userAuth in my collection
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	// if user data does exist - return userDocRef
	return userDocRef;
};
