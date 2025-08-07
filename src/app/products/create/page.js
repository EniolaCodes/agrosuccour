// "use client"

// import { useState } from "react"
// // import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     product_name: "",
//     description: "",
//     price: "",
//     stock_quantity: "",
//     category: "",
//   })
//   const [image, setImage] = useState(null)
//   const [message, setMessage] = useState("")

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0])
//     }
//   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()

// //     const formDataToSend = new FormData()
// //     Object.entries(formData).forEach(([key, value]) => {
// //       formDataToSend.append(key, value)
// //     })

// //     if (image) {
// //       formDataToSend.append("image", image)
// //     }
// //     console.log('formDataToSend: ', formDataToSend)
// //     try {
// //         const response = await fetch("http://localhost:3100/product/create", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json", // Specify JSON content type
// //           },
// //           body: JSON.stringify({
// //             product_name: "Fawaz tomato",
// //             description: "Latest tomato in market",
// //             price: 999.99,
// //             stock_quantity: 100,
// //             image_url: "C:/Users/Admin/Desktop/Work/agricco/test_pract/router.png",
// //             category: "Fruits",
// //           }), // Convert object to JSON string
// //         });

// //         console.log("Response: ", response);

// //         if (!response.ok) {
// //           throw new Error("Failed to create product.");
// //         }

// //         const result = await response.json();
// //         setMessage(`Product created successfully: ${JSON.stringify(result)}`);
// //       } catch (error) {
// //         setMessage(`Error: ${error.message}`);
// //       }

// //   }

// const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const formData = new FormData();
//       formData.append("product_name", "Fawaz tomato");
//       formData.append("description", "Latest tomato in market");
//       formData.append("price", 999.99);
//       formData.append("stock_quantity", 100);
//       formData.append("category", "Fruits");
//       formData.append(
//         "image",
//         document.querySelector('input[type="file"]').files[0]
//       );
//       console.log("formData: ", formData);
//     // for (const [key, value] of formData.entries()) {
//     //     console.log(`${key}:`, value);
//     //   }
//       const response = await fetch("http://localhost:3100/product/create", {
//         method: "POST",
//         body: formData, // Send FormData
//       });

//       console.log("Response: ", response);

//       if (!response.ok) {
//         throw new Error("Failed to create product.");
//       }

//       const result = await response.json();
//       setMessage(`Product created successfully: ${JSON.stringify(result)}`);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <h1 className="text-2xl font-semibold mb-6 text-center">Create Product</h1>
//             <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
//               <div>
//                 <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   id="product_name"
//                   name="product_name"
//                   value={formData.product_name}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                   rows={3}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="number"
//                     id="stock_quantity"
//                     name="stock_quantity"
//                     value={formData.stock_quantity}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                   Product Image
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     {/* <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" /> */}
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor="image"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="image"
//                           name="image"
//                           type="file"
//                           onChange={handleImageChange}
//                           accept="image/*"
//                           required
//                           className="sr-only"
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Create Product
//                 </button>
//               </div>
//             </form>
//             {message && (
//               <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//                 {message}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductForm

// ---------------------------------------------------------------------------------------

"use client";

import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Dynamically append all formData state fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append the image file if available
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch("http://localhost:3100/product/create", {
        method: "POST",
        body: formDataToSend, // Send FormData
      });

      if (!response.ok) {
        throw new Error("Failed to create product.");
      }

      const result = await response.json();
      setMessage(`Product created successfully: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Create Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST" className="space-y-6">
              <div>
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock_quantity"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleImageChange}
                          accept="image/*"
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Product
                </button>
              </div>
            </form>
            {message && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
