import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignIn } from "../services/users";


const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
  //  const { setUser } = useContext(AuthContext);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswdChange = (e) => setPassword(e.target.value);

	const handleSignInClick =  () => {
		try {
			// validate user login using REST service
			  userSignIn(email, password);
			// store user object + jwt token (in sessionStorage)
			//ssessionStorage.setItem("user", JSON.stringify(user));
			// update the context
			//o
			// setUser(user);
			// after successful login, go to user dashboard
			navigate("/user");
		} catch (err) {
			toast.error("Invalid credentials."+err.name);
		}
	};

	return (
		<div className="col border border-2 shadow p-5 m-3">
			<div className="mb-3 text-center">
				<h2>Login Form</h2>
			</div>
			<div className="mb-3">
				<label className="form-label">Email:</label>
				<input
					className="form-control"
					name="email"
					type="text"
					onChange={handleEmailChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Password:</label>
				<input
					className="form-control"
					name="password"
					type="password"
					onChange={handlePasswdChange}
				/>
			</div>
			<div className="row">
				<button
					className="mx-3 col btn btn-primary"
					onClick={handleSignInClick}
				>
					Sign In
				</button>
				<Link className="mx-3 col btn btn-secondary" to="/register">
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
