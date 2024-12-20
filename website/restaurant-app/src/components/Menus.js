import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/menus/')
      .then(response => {
        setMenus(response.data);
      })
      .catch(error => {
        console.error("Error fetching menus:", error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Menus</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {menus.map(menu => (
          <div
            key={menu.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              maxWidth: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={menu.image}
              alt={menu.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3>{menu.name}</h3>
            <p>Price: Rp {menu.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menus;
