
// // const AddQuote = () => {
// //     return (
// //       <div className="card mx-auto" style={{ maxWidth: '600px' }}>
// //         <div className="card-body">
// //           <h4 className="card-title text-center">Add New Quote</h4>
// //           <input type="text" className="form-control mb-3" placeholder="Author" />
// //           <textarea className="form-control mb-3" rows="4" placeholder="Quote..."></textarea>
// //           <button className="btn btn-primary w-100">Add Quote</button>
// //         </div>
// //       </div>
// //     );
// //   };
// import React, { useState } from "react";
// import { addQuotes } from "../services/quoteService";
// import { getUserId } from "../utils/auth"; 
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router";


// const AddQuote = () => {
//   const [formData, setFormData] = useState({
//     author: "",
//     contents: "",
//   });
//   const navigate = useNavigate();
  
//   const handleInputFieldChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.author.trim()) {
//       toast.error("Author is required!");
//       return false;
//     }
//     if (!formData.contents.trim()) {
//       toast.error("Quote content is required!");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userId = getUserId();
//     if (!userId) {
//       toast.error("User not logged in.");
//       return;
//     }
//     if (!validateForm()) {
//       return;
//     }
//     const quoteData = {
//       userId,
//       author: formData.author,
//       contents: formData.contents,
//       createdTime: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
//     };

//     try {
//       await addQuotes(quoteData);
//       toast.success("Quote added successfully!");
//       setFormData({ author: "", contents: "" });
//       navigate("/my-quotes");
//     } catch (err) {
//       toast.error("Error adding quote: " + err.message);
//     }
//   };

//   return (
//     <div className="card mx-auto" style={{ maxWidth: "600px" }}>
//       <div className="card-body">
//         <h4 className="card-title text-center">Add New Quote</h4>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="author"
//             className="form-control mb-3"
//             placeholder="Author"
//             value={formData.author}
//             onChange={handleInputFieldChange}
//           />
//           <textarea
//             name="contents"
//             className="form-control mb-3"
//             rows="4"
//             placeholder="Quote..."
//             value={formData.contents}
//             onChange={handleInputFieldChange}
//           ></textarea>
//           <button type="submit" className="btn btn-primary w-100">
//             Add Quote
//           </button>
//         </form>
//         {/* <ToastContainer position="top-center" /> */}
//       </div>
//     </div>
//   );
// };

// export default AddQuote;
  

import React, { useState, useEffect } from "react";
import { addQuotes, fetchQuoteById, updateQuote } from "../services/quoteService";
import { getUserId } from "../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const AddQuote = () => {
  const [formData, setFormData] = useState({
    author: "",
    contents: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // quoteId if editing
  const isEdit = !!id;

  useEffect(() => {
    const loadQuote = async () => {
      if (isEdit) {
        try {
          const quote = await fetchQuoteById(id);
          setFormData({
            author: quote.author,
            contents: quote.contents,
          });
        } catch (err) {
          toast.error("Error fetching quote."+err.message);
        }
      }
    };

    loadQuote();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.author.trim()) {
      toast.error("Author is required!");
      return false;
    }
    if (!formData.contents.trim()) {
      toast.error("Quote content is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = getUserId();
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const quoteData = {
      userId,
      author: formData.author,
      contents: formData.contents,
      createdTime: new Date().toISOString().slice(0, 10),
    };

    try {
      if (isEdit) {
        await updateQuote(id, quoteData);
        toast.success("Quote updated successfully!");
      } else {
        await addQuotes(quoteData);
        toast.success("Quote added successfully!");
      }
      navigate("/my-quotes");
    } catch (err) {
      toast.error(`Error ${isEdit ? "updating" : "adding"} quote: ` + err.message);
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "600px" }}>
      <div className="card-body">
        <h4 className="card-title text-center">
          {isEdit ? "Update Quote" : "Add New Quote"}
        </h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="author"
            className="form-control mb-3"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <textarea
            name="contents"
            className="form-control mb-3"
            rows="4"
            placeholder="Quote..."
            value={formData.contents}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" className="btn btn-primary w-100">
            {isEdit ? "Update Quote" : "Add Quote"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuote;
