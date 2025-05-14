import React, { useEffect, useState } from "react";
import {
	fetchAllQuotes,
	getFavoriteQuotesByUserId,
	markAsFavorite,
	unmarkAsFavorite,
} from "../services/quoteService";
import { getUserId } from "../utils/auth"; 
const Home = () => {
	const [tab, setTab] = useState("all");
	const [quotes, setQuotes] = useState([]);
	const [error, setError] = useState(""); // Track error messages
	const userId = getUserId();
	const loadQuotes = async () => {
		try {
			let data;

			if (tab === "all") {
				data = await fetchAllQuotes(userId);
			} else {
				data = await getFavoriteQuotesByUserId(userId);
			}

			setQuotes(data);
			setError(""); // Clear any previous error
		} catch (err) {
			// When no favorite quotes found, empty the list and show message
			if (tab === "favorites") {
				setQuotes([]);
				setError("No favorite quotes found.");
			} else {
				setError("Failed to fetch quotes.");
			}
			console.error(err.message);
		}
	};

	const handleLikeToggle = async (quote) => {
		try {
			if (quote.liked == true) {
				await unmarkAsFavorite(userId, quote.id);
			} else {
				await markAsFavorite(userId, quote.id);
			}
		  await	loadQuotes();
		} catch (err) {
			console.error("Error toggling like:", err.message);
		}
	};

const handleUnmarkOnly = async (quote) => {
  try {
    await unmarkAsFavorite(userId, quote.id); // quote.id should be a number
    await loadQuotes();
  } catch (err) {
    console.error("Error unmarking favorite:", err.message);
  }
};
	useEffect(() => {
		loadQuotes();
	}, [tab]);

	return (
		<div>
			<h3>Quotes</h3>

			{/* Tabs */}
			<ul className="nav nav-tabs mb-3">
				<li className="nav-item">
					<button
						className={`nav-link ${tab === "all" ? "active" : ""}`}
						onClick={() => setTab("all")}
					>
						All
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link ${tab === "favorites" ? "active" : ""}`}
						onClick={() => setTab("favorites")}
					>
						Favorites
					</button>
				</li>
			</ul>

			{/* Error Message */}
			{error && <p className="text-danger">{error}</p>}

			{/* Quote Cards */}
			{quotes.length === 0 && !error && (
				<p className="text-muted">No quotes available.</p>
			)}

			{quotes.map((q,index) => (
				<div className="card mb-3"  key={`${q.id}-${index}`}>
					<div className="card-body">
						<blockquote className="blockquote mb-0">
							<p>{q.contents}</p>
							<footer className="blockquote-footer">{q.author}</footer>
						</blockquote>
						<button
							className={`btn btn-sm mt-2 ${q.liked ? "btn-danger" : "btn-outline-danger"}`}
							onClick={() => handleLikeToggle(q)}
						>
							{q.liked ? "❤️ Liked" : "🤍 Liked"}
						</button>

						{/* Unmark button only on "favorites" tab */}
						{tab === "favorites" && (
							<button
								className="btn btn-sm btn-warning mt-2"
								onClick={() => handleUnmarkOnly(q)}
							>
								Unmark
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;

// const Home = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [quotes, setQuotes] = useState([
//     { id: 1, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", liked: true },
//     { id: 2, text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", liked: false },
//     { id: 3, text: "The purpose of our lives is to be happy.", author: "Dalai Lama", liked: true }
//   ]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const toggleLike = (id) => {
//     setQuotes(prev =>
//       prev.map(quote =>
//         quote.id === id ? { ...quote, liked: !quote.liked } : quote
//       )
//     );
//   };

//   const filteredQuotes = activeTab === 'all'
//     ? quotes
//     : quotes.filter(q => q.liked);

//   return (
//     <div>
//       <h3>Quotes</h3>

//       {/* Tabs */}
//       <ul className="nav nav-tabs mb-3">
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
//             onClick={() => handleTabClick('all')}
//           >
//             All Quotes
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
//             onClick={() => handleTabClick('favorites')}
//           >
//             Favorite Quotes
//           </button>
//         </li>
//       </ul>

//       {/* Quote Cards */}
//       {filteredQuotes.length === 0 && (
//         <p className="text-muted">No quotes to display.</p>
//       )}

//       {filteredQuotes.map((quote) => (
//         <div className="card my-3" key={quote.id}>
//           <div className="card-body">
//             <blockquote className="blockquote mb-0">
//               <p>"{quote.text}"</p>
//               <footer className="blockquote-footer">{quote.author}</footer>
//             </blockquote>
//             <button
//               className={`btn btn-sm mt-2 ${quote.liked ? 'btn-danger' : 'btn-outline-danger'}`}
//               onClick={() => toggleLike(quote.id)}
//             >
//               {quote.liked ? '❤️ Liked' : '🤍 Like'}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };



