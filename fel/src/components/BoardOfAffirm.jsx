import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function BoardOfAffirm() {
  const [affirmations, setAffirmations] = useState([]);
  const [newAffirmation, setNewAffirmation] = useState('');

  const fetchAffirmations = () => {
    axios.get("http://localhost:5001/affirmations")
      .then(response => {
        console.log(response.data)
        setAffirmations(response.data);
      })
      .catch(error => {
        console.error("ERROR WAS DETECTED.", error);
      });
  }

  useEffect(() => {
    fetchAffirmations();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/affirmations", {
      affirmation: newAffirmation
    })
    .then(response => {
      setNewAffirmation(''); // Clear the input field
      fetchAffirmations(); // Refresh the list of affirmations
    })
    .catch(error => {
      console.error('ERROR: ', error);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="text-center mb-3">
        here's your board of affirmations! (if you are ever feeling ill or unwell about us, just read here and I'll tell you
        all about how amazing you are!)
      </div>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
          className="border rounded p-2 mr-2"
          placeholder="Enter your affirmation"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Affirmation
        </button>
      </form>
      <div className="mt-3">
        <h3 className="text-lg mb-2">Affirmations:</h3>
        <ul className="list-disc list-inside">
          {affirmations.map((aff, index) => (
            <li key={index}>{aff.affirmation} {new Date(aff.date).toISOString().split('T')[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BoardOfAffirm;
