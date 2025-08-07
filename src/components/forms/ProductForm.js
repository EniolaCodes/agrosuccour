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
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:3100/product/create", {
        method: "POST",
        body: formDataToSend,
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
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;
