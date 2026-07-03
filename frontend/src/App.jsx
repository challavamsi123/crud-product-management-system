import { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  name: '',
  price: '',
  category: '',
  description: ''
};

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const showAlert = (text) => {
    window.alert(text);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      showAlert('Unable to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.description) {
      showAlert('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, {
          ...form,
          price: Number(form.price)
        });
        showAlert('Product updated successfully');
      } else {
        await axios.post('/api/products', {
          ...form,
          price: Number(form.price)
        });
        showAlert('Product added successfully');
      }

      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      await axios.delete(`/api/products/${id}`);
      showAlert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      showAlert('Failed to delete product');
    }
  };

  return (
    <div className="app">
      <h1>Product Management System</h1>

      <form onSubmit={handleSubmit} className="card">
        <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <div className="actions">
          <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(initialForm); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <h2>Product List</h2>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <div className="product-item" key={product._id}>
                <div>
                  <h3>{product.name}</h3>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p>{product.description}</p>
                </div>
                <div className="actions">
                  <button type="button" onClick={() => handleEdit(product)}>Edit</button>
                  <button type="button" className="danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
