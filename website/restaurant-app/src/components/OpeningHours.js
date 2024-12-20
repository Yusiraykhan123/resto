import React, { useEffect, useState } from "react";
import { fetchOpeningHours } from "../api";

const OpeningHours = () => {
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    fetchOpeningHours()
      .then((response) => setOpeningHours(response.data))
      .catch((error) => console.error("Error fetching opening hours:", error));
  }, []);

  return (
    <div>
      <h1>Opening Hours</h1>
      <ul>
        {openingHours.map((hour) => (
          <li key={hour.id}>
            {hour.day}: {hour.opening_time} - {hour.closing_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpeningHours;
