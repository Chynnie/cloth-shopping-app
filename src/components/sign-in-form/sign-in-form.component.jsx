import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";
import {
	signInWithGooglePopup,
	// createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultSignInFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [signInForm, setSignInForm] = useState(defaultSignInFields);
	const { email, password } = signInForm;

	// const { setCurrentUser } = useContext(UserContext);

	const resetSignInFields = () => {
		setSignInForm(defaultSignInFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		// setCurrentUser(user);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			// setCurrentUser(user);

			resetSignInFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log(error);
			}
		}
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;

		setSignInForm({ ...signInForm, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={onSubmitHandler}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={onChangeHandler}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={onChangeHandler}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
