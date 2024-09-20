import { addLoader, clearGallery, hideLoading, renderGallery, showInfo, scrollBar } from './js/render-functions.js';
import { getGallery } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
let perPage = 15;

loadMoreBtn.style.display = 'none';

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.error({
      title: `Error`,
      message: `Please enter a search query.`,
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  loadMoreBtn.style.display = 'none';
  addLoader(gallery);

  page = 1; // Оновлюємо сторінку при новому запиті

  try {
    const data = await getGallery(query, page, perPage);
    hideLoading();

    totalHits = data.totalHits;

    if (!data || data.hits.length === 0) {
      showInfo(`Sorry, there are no images matching your search query. Please try again!`);
      return;
    }

    renderGallery(data.hits);

    if (data.hits.length >= perPage && (page * perPage) < totalHits) {
      loadMoreBtn.style.display = 'block'; 
    }

  } catch (error) {
    console.error(`Error fetching images:`, error);
    iziToast.error({
      title: `Error`,
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoading();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  if ((page * perPage) >= totalHits) {
    iziToast.error({
      position: "topRight",
      message: "We're sorry, but you've reached the end of search results."
    });
    loadMoreBtn.style.display = 'none';
    return;
  }

  page += 1; // Збільшуємо номер сторінки для наступного запиту
  addLoader(gallery);

  try {
    const data = await getGallery(query, page, perPage);
    hideLoading();

    if (!data || data.hits.length === 0) {
      showInfo('No more images found.');
      loadMoreBtn.style.display = 'none'; // Ховаєм кнопку, якщо немає більше зображень
      return;
    }

    renderGallery(data.hits); // Додаємо нові зображення до галереї

    scrollBar();

    if ((page * perPage) < totalHits) {
      loadMoreBtn.style.display = 'block'; // Якщо є ще зображення, показуємо кнопку
    } else {
      loadMoreBtn.style.display = 'none'; // Ховаєм кнопку, якщо дойшли до кінця 
    }

  } catch (error) {
    console.error(`Error fetching images:`, error);
    iziToast.error({
      title: `Error`,
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoading();
  }
});