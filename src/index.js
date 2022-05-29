import images from './templates/images';
import PixabayService from './pixabay-service';
import Notiflix from 'notiflix';
import LoadMoreButton from './components/load_more_btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};
const pixabayService = new PixabayService();
const loadMoreButton = new LoadMoreButton({ selector: '.load-more', hidden: true });

const simpleLightbox = new SimpleLightbox('.image-link');

refs.form.addEventListener('submit', onSearch);
loadMoreButton.button.addEventListener('click', onButtonLoadMoreClick);

async function onSearch(e) {
  e.preventDefault();

  pixabayService.query = refs.form.elements.searchQuery.value;
  if (pixabayService.query === '') {
    return Notiflix.Notify.warning('Please enter a request.');
  }
  pixabayService.resetPage();

  const resalt = await pixabayService.fetchImages();

  if (resalt.hits.length === 0) {
    clearGalery();
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }

  clearGalery();
  renderGalery(resalt.hits);
  Notiflix.Notify.success(`Hooray! We found ${resalt.totalHits} images.`);
  simpleLightbox.refresh();
  loadMoreButton.show();
}

function renderGalery(data) {
  refs.gallery.insertAdjacentHTML('beforeend', images(data));
}

async function onButtonLoadMoreClick() {
  try {
    const resalt = await pixabayService.fetchImages();

    renderGalery(resalt.hits);

    simpleLightbox.refresh();
    const max_page = resalt.totalHits / 40;
    if (pixabayService.page > max_page) {
      loadMoreButton.hide();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
  }
}

function renderGalery(data) {
  refs.gallery.insertAdjacentHTML('beforeend', images(data));
}

function clearGalery() {
  refs.gallery.innerHTML = '';
  loadMoreButton.hide();
}
