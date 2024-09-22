import axios from 'axios';
const keyApi = '45922188-6c9bdbb7442dfc44aff321ea7';
const url = "https://pixabay.com/api/";

export async function getGallery(query, page = 1, perPage = 15) {
  const searchParams = new URLSearchParams({
    key: keyApi,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perPage,
  });

  const fullUrl = `${url}?${searchParams.toString()}`;

  try {
    const response = await axios.get(fullUrl);
      console.log('Total Hits:', response.data.totalHits); 
      console.log('Current Page Results:', response.data.hits); // Перевірка кількості результатів
    return response.data;
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
    throw error;
  }
}