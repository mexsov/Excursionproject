import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({ title: '', image_url: '', duration: '', price: '' });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const response = await axios.get('/api/tours');
    setTours(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/tours', form);
    fetchTours();
    setForm({ title: '', image_url: '', duration: '', price: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tours/${id}`);
    fetchTours();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1>Tours</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
        />
        <button type="submit">Add Tour</button>
      </form>

      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            {tour.title} - {tour.duration} - ${tour.price}
            <button onClick={() => handleDelete(tour.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToursPage;
