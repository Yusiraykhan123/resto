import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchMenus = () => axios.get(`${BASE_URL}/menus/`);
export const fetchCategories = () => axios.get(`${BASE_URL}/menus/categories/`);
export const fetchProfile = () => axios.get(`${BASE_URL}/profile/`);
export const fetchOpeningHours = () => axios.get(`${BASE_URL}/opening-hour/`);
export const fetchFAQ = () => axios.get(`${BASE_URL}/faq/`);
