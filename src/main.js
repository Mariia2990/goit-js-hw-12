import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, toggleLoadMoreButton } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let currentPage = 1;
let currentQuery = '';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  
  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.error({
        title: `Error`,
        message: `Please enter a search query.`,
        position: 'topRight',
        backgroundColor: "red",
        messageColor: "white",
        titleColor: "white",
    });
    return;
    }
    
    currentPage = 1;
clearGallery();
await fetchAndRenderImages();
}

async function onLoadMore() {
currentPage += 1;
await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
    try {
        const data = await fetchImages(currentQuery, currentPage);
        renderImages(data.hits);

        scrollBar(); //Додаємо плавне прокручування
  
        // Перевіряємо, чи є ще зображення для завантаження
        if (data.totalHits <= currentPage * 15) {
            toggleLoadMoreButton(false);
            iziToast.info({
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results.",
                backgroundColor: "green",
                messageColor: "white",
                titleColor: "white",
            });
        } else {
            toggleLoadMoreButton(true);
        }
    } catch (error) {
        console.error('Error:', error);
        iziToast.error({
            position: 'topRight',
            message: `Something went wrong: ${error.message}`,
            backgroundColor: "red",
            messageColor: "white",
            titleColor: "white",
        });
    }
}

function scrollBar() {
  const galleryItem = document.querySelector('.gallery a');
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
  }
}