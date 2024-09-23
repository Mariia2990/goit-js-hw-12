import axios from 'axios';

const API_KEY = '45922188-6c9bdbb7442dfc44aff321ea7';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
