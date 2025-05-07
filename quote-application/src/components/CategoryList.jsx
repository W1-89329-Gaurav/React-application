import { useEffect, useState } from "react";
import { getCategories } from "../services/books";
import { toast } from "react-toastify";

const CategoryList = () => {
	const [categories, setCategories] = useState([]);

	// helper function to fetch data from rest api
	const loadCategories = async () => {
		try {
			const cats = await getCategories();
			setCategories(cats);
		} catch (err) {
			toast.error(err.message);
		}
	};

	// executed when component is mounted
	useEffect(() => {
		loadCategories();
	}, []);

	// render the component
	return (
		<div>
			<h1>Category List</h1>
			{categories.map((c) => (
				<div
					key={c}
					className="card d-inline-block m-3 p-2 shadow"
					style={{ width: "250px" }}
				>
					<h3 className="card-title">{c}</h3>
					<button className="btn btn-primary mt-3">Show Books</button>
				</div>
			))}
		</div>
	);
};

export default CategoryList;
