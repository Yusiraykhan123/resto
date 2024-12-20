import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState(['All']);
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'http://localhost:8000';

  // Fetch both categories and menus
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories
        const categoriesResponse = await axios.get(`${baseURL}/api/menus/categories/`);
        const categoriesData = categoriesResponse.data;
        const categoryList = ['All', ...categoriesData.map(cat => cat.name)];
        setCategories(categoryList);

        // Fetch menus
        const menusResponse = await axios.get(`${baseURL}/api/menus/`);
        const menusData = menusResponse.data;
        setMenus(menusData);
        setFilteredMenus(menusData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter menus based on selected category
  const filterMenusByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter(menu => menu.category === category);
      setFilteredMenus(filtered);
    }
  };

  // Handle image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150';
    if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
      return imagePath;
    }
    return `${baseURL}${imagePath}`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', paddingTop: '50px' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Menu Categories</h1>

      {/* Category buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterMenusByCategory(category)}
            style={{
              padding: '10px 20px',
              border: selectedCategory === category ? '2px solid #007BFF' : '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedCategory === category ? '#007BFF' : '#f9f9f9',
              color: selectedCategory === category ? '#fff' : '#333',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredMenus.length > 0 ? (
          filteredMenus.map(menu => (
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
                src={getImageUrl(menu.image)}
                alt={menu.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3>{menu.name}</h3>
              <p>Price: Rp {menu.price.toLocaleString()}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: 'gray' }}>
            No menus available for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
