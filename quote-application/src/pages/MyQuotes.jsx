import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchQuotesByUserId, deleteQuote } from "../services/quoteService"; 
import { getUserId } from "../utils/auth"; 
// const MyQuotes = () => {
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = getUserId(); 

//   useEffect(() => {
//     if (!userId) {
//       console.log("User not logged in");
//       return; // Optionally redirect to login if userId is not found
//     }

//     const fetchUserQuotes = async () => {
//       try {
//         const result = await fetchQuotesByUserId(userId);
//         setQuotes(result);
//       } catch (error) {
//         console.error("Error fetching quotes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserQuotes();
//   }, [userId]);

//   const handleDelete = async (quoteId) => {
//     try {
//       await deleteQuote(quoteId);
//       setQuotes(quotes.filter((quote) => quote.id !== quoteId));
//     } catch (err) {
//       console.error("Error deleting quote:", err);
//     }
//   };

//   return (
//     <div>
//       <h3>My Favorite Quotes</h3>
//       <Link to="/add-quote" className="btn btn-primary mb-3">
//         Add New Quote
//       </Link>

//       {loading ? (
//         <p>Loading quotes...</p>
//       ) : (
//         <ul>
//           {quotes.length > 0 ? (
//             quotes.map((quote) => (
//               <li key={quote.id} className="quote-item">
//                 <p>"{quote.contents}" - <b>{quote.author}</b></p>
//                 <button
//                   onClick={() => handleDelete(quote.id)}
//                   className="btn btn-danger"
//                 >
//                   Delete
//                 </button>
//                 {/* You can add edit functionality here */}
//               </li>
//             ))
//           ) : (
//             <p>No quotes found.</p>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyQuotes;


import { Modal, Button } from "react-bootstrap"; 

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState(null);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      console.log("User not logged in");
      return; // Optionally redirect to login if userId is not found
    }

    const fetchUserQuotes = async () => {
      try {
        const result = await fetchQuotesByUserId(userId);
        setQuotes(result);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserQuotes();
  }, [userId]);

  const handleDelete = async () => {
    if (!quoteToDelete) return;

    try {
      await deleteQuote(quoteToDelete.id);
      setQuotes(quotes.filter((quote) => quote.id !== quoteToDelete.id));
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting quote:", err);
    }
  };

  const handleConfirmDelete = (quote) => {
    setQuoteToDelete(quote);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setQuoteToDelete(null);
    setShowDeleteDialog(false);
  };

  return (
    <div>
      <h3>My Quotes</h3>
     <div className="text-end mb-3">
  <Link to="/add-quote" className="btn btn-primary">
    Add  Quote
  </Link>
</div>
      {loading ? (
        <p>Loading quotes...</p>
      ) : (
        <div className="quote-list">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <div key={quote.id} className="quote-card mb-3">
                <div className="quote-content">
                  <p>Content: {quote.contents}</p>
                  <p>
                    <b>Author Name: {quote.author}</b>
                  </p>
                </div>
          
                <div className="quote-actions">
                
                  <Link to={`/add-quote/${quote.id}`} className="btn btn-warning mr-2">
                    Edit
                  </Link>
         
                  <button
                    onClick={() => handleConfirmDelete(quote)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
          
                </div>
           
              </div>
            ))
          ) : (
            <p>No quotes found.</p>
          )}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this quote? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyQuotes;
