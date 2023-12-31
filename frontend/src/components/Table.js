import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import {Link} from 'react-router-dom';
import Edit from './Edit';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [vis, setVis] = useState('block');
  const [isdeleted, setIsdeleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [vis, isdeleted]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter(rowId => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then((response) => {
        console.log('Item deleted:', response.data);
        setIsdeleted(true);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
      setIsdeleted(false);
  }

  
  const sendEmail = async () => {
    try {
      // Make API request to send email
      const response = await axios.post('http://localhost:3000/send-email', {
        selectedRows: selectedRows,
      });
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const dynamicStyles = {
    display: vis ? 'block' : 'none'
  };

 

  return (
    <div className="max-w-4xl mx-auto p-4">
        <div>
          <table className="w-full border border-collapse" style={dynamicStyles}>
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">
                  <input type="checkbox" />
                </th>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Hobbies</th>
                <th className="border p-2">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row._id}
                  className={selectedRows.includes(row._id) ? 'bg-yellow-100' : ''}
                >
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectRow(row._id)}
                      checked={selectedRows.includes(row._id)}
                    />
                  </td>
                  <td className="border p-2">{row._id}</td>
                  <td className="border p-2">{row.name}</td>
                  <td className="border p-2">{row.phone}</td>
                  <td className="border p-2">{row.email}</td>
                  <td className="border p-2">{row.hobbies}</td>
                  <td className="border p-2">
                    <Link className="btn btn-blue" to="/edit" state={row} >Update</Link>
                    <button className="btn btn-red ml-2" onClick={() => handleDelete(row._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 space-x-4"style={dynamicStyles}>
            <button className="btn bg-slate-500 p-2" onClick={sendEmail}>
              Send
            </button>
            <button className="btn bg-indigo-400 p-2" onClick={() => {setIsPopupOpen(true); setVis(!vis);}}>
              Add Data
            </button>
        </div>

        {isPopupOpen && (
          <div>
            <div>
              <Form setIsPopupOpen={setIsPopupOpen} setVis={setVis} />
            </div>
            <button onClick={() => {setIsPopupOpen(false); setVis(!vis);}}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
