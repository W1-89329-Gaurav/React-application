import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignUp } from "../services/users";

const RegistrationForm = () => {
	const [info, setInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPasswd: "",
		phoneNumber: "",
		address: "",
	});

	const navigate = useNavigate();
	const handleInputFieldChange = (e) =>
		setInfo({ ...info, [e.target.name]: e.target.value });

	const handleSignUpClick = async () => {
		try {
			// Ensure passwords match
			if (info.password !== info.confirmPasswd) {
				toast.error("Passwords do not match!");
				return;
			}

			// register user using REST api
			const user = await userSignUp(
				info.firstName,
				info.lastName,
				info.email,
				info.password,
				`${info.firstName} ${info.lastName}`,
				info.phoneNumber,
				info.address
			);
			toast.success("User registered with id: " + console.log(user.id));
			// then go to login page
			navigate("/login");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="col border border-2 shadow p-5 m-3">
			<div className="mb-3 text-center">
				<h2>Registration Form</h2>
			</div>
			<div className="mb-3">
				<label className="form-label">First Name:</label>
				<input
					className="form-control"
					name="firstName"
					type="text"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Last Name:</label>
				<input
					className="form-control"
					name="lastName"
					type="text"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Email:</label>
				<input
					className="form-control"
					name="email"
					type="text"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Password:</label>
				<input
					className="form-control"
					name="password"
					type="password"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Confirm Password:</label>
				<input
					className="form-control"
					name="confirmPasswd"
					type="password"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Phone Number:</label>
				<input
					className="form-control"
					name="phoneNumber"
					type="text"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Address:</label>
				<input
					className="form-control"
					name="address"
					type="text"
					onChange={handleInputFieldChange}
				/>
			</div>
			<div className="row">
				<button
					className="mx-3 col btn btn-primary"
					onClick={handleSignUpClick}
				>
					Sign Up
				</button>
				<Link className="mx-3 col btn btn-secondary" to="/login">
					Sign In
				</Link>
			</div>
		</div>
	);
};

export default RegistrationForm;
