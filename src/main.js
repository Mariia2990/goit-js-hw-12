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
        showInfo('Sorry, there are no images matching your search query. Please try again!');
        return;
    }

    renderGallery(data.hits);

    if (data.hits.length >= perPage && (page * perPage) < totalHits) {
loadMoreBtn.style.display = 'block'; 
    }

} catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
        title: 'Error',
        message: `Error: ${error.message}`,
        position: 'topRight',
    });
} finally {
    hideLoading();
}
});

loadMoreBtn.addEventListener("click", async () => {
  // Перевіряємо, чи вже досягли кінця результатів
  if ((page * perPage) >= totalHits) {
    iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        backgroundColor: "red",
        messageColor: "white",
        titleColor: "white",
    });
    loadMoreBtn.style.display = 'none';
    return;
}

  page += 1; // Збільшуємо номер сторінки для наступного запиту
addLoader(gallery);

try {
    const data = await getGallery(query, page, perPage);
    hideLoading();

    // Перевіряємо, чи є результати на поточній сторінці
if (!data || data.hits.length === 0) {
    showInfo('No more images found.');
      loadMoreBtn.style.display = 'none'; // Ховаємо кнопку, якщо немає більше зображень
    return;
    }

    renderGallery(data.hits); // Додаємо нові зображення до галереї

    scrollBar();

    // Якщо показано всі результати, ховаємо кнопку
    if ((page * perPage) >= totalHits) {
    loadMoreBtn.style.display = 'none';
    iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: "red",
        messageColor: "white",
        titleColor: "white",
});
    }

} catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
        title: 'Error',
        message: `Error: ${error.message}`,
        position: 'topRight',
    });
} finally {
    hideLoading();
}
});