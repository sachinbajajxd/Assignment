import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Link, Router, Routes, Route, useLocation} from 'react-router-dom';


const Edit = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const propsData = location.state;
    console.log(propsData);

  const [formData, setFormData] = useState({
    name: propsData.name,
    email: propsData.email,
    phone: propsData.phone,
    hobbies: propsData.hobbies,
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const id=propsData._id

    axios.put(`http://localhost:3000/users/${id}`, formData)
      .then(response => {
        console.log('Data sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
      navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="hobbies" className="block font-medium text-gray-700">
            Hobby (only one)
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            rows="3"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default Edit;
