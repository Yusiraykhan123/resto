import React, { useEffect, useState } from "react";
import { fetchFAQ } from "../api";  // Correct the import to match the exported function name

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQ()
      .then((response) => setFaqs(response.data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq.id}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
