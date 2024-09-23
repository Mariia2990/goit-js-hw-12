import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="gallery-link">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="img-gallery"/>
      <ul class="list-wrapper">
        <li class="text-content"><b>Likes:</b> ${image.likes}</li>
        <li class="text-content"><b>Views:</b> ${image.views}</li>
        <li class="text-content"><b>Comments:</b> ${image.comments}</li>
        <li class="text-content"><b>Downloads:</b> ${image.downloads}</li>
      </ul>
    </a>
  `).join('');
  
  gallery.insertAdjacentHTML('beforeend', markup);
  
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom'
      });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMoreButton(show) {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.style.display = show ? 'block' : 'none';
}
