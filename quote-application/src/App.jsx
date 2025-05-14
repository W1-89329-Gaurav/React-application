//import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// import Home from "./components/Home";
// import LoginForm from "./components/LoginForm";
// import RegistrationForm from "./components/RegistrationForm";
// import CategoryList from "./components/CategoryList";
// //import BookList from "./components/BookList";
// //import ShoppingCart from "./components/ShoppingCart";
// //import OrderList from "./components/OrderList";
// //import BookForm from "./components/BookForm";
// import UserDashboard from "./components/UserDashboard";
// import UserLayout from "./components/UserLayout";
// //import { useState } from "react";
// //import { createContext, useState } from "react";

// // export const AuthContext = createContext();

// // function getUserFromSessionStorage() {
// // 	const userJson = sessionStorage.getItem("user");
// // 	const user = JSON.parse(userJson);
// // 	return user;
// // }

// function App() {
// 	//const [user, setUser] = useState ("");

// 	return (
// 		<div className="container">
			
// 				<Routes>
// 					{/* /url */}
// 					<Route index="true" element={<Home />} />
// 					<Route path="/login" element={<LoginForm />} />
// 					<Route path="/register" element={<RegistrationForm />} />
// 					{/* /user/url */}
// 					<Route path="/user" element={<UserLayout />}>
// 						<Route index="/user-dashboard" element={<UserDashboard />} />
// 						<Route path="categories" element={<CategoryList />} />
// 						{/* <Route path="books" element={<BookList />} /> */}
// 						{/* <Route path="cart" element={<ShoppingCart />} /> */}
// 						{/* <Route path="orders" element={<OrderList />} /> */}
// 						{/* o<Route path="newbook" element={<BookForm />} /> */}
// 					</Route>
// 				</Routes>
			
// 		</div>
// 	);
// }


import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyQuotes from './pages/MyQuotes';
import AddQuote from './pages/AddQuote';
//import Profile from "./pages/profile";
import Profiles from "./pages/Profiles";
import { useLocation } from 'react-router';


function App() {
	const location = useLocation();
	const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
	return (
	  <>
		 {!shouldHideNavbar && <Navbar />}
		 		<div className="container mt-4">
		  <Routes>
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/home" element={<Home />} />
			<Route path="/my-quotes" element={<MyQuotes />} />
			<Route path="/add-quote" element={<AddQuote />} />
			<Route path="/add-quote/:id" element={<AddQuote />} />
			<Route path="/profile" element={<Profiles />} />
		  </Routes>
		</div>
	  </>
	);
  }
  
export default App;

