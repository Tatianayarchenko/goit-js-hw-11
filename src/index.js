import images from './templates/images';
import PixabayService from './pixabay-service';
import Notiflix from 'notiflix';
import LoadMoreButton from './components/load_more_btn';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};
const pixabayService = new PixabayService();
const loadMoreButton = new LoadMoreButton({ selector: '.load-more', hidden: true });

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
  loadMoreButton.show();
}

// function onSearch(e) {
//   e.preventDefault();

//   pixabayService.query = refs.form.elements.searchQuery.value;
//   if (pixabayService.query === '') {
//     return Notiflix.Notify.warning('Please enter a request.');
//   }
//   pixabayService.resetPage();

//   pixabayService.fetchImages().then(resalt => {
//     if (resalt.hits.length === 0) {
//       clearGalery();
//       return Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.',
//       );
//     }
//     clearGalery();
//     renderGalery(resalt.hits);
//     loadMoreButton.show();
//   });
// }

function renderGalery(data) {
  refs.gallery.insertAdjacentHTML('beforeend', images(data));
}

async function onButtonLoadMoreClick() {
  try {
    const resalt = await pixabayService.fetchImages();

    renderGalery(resalt.hits);
    const max_page = resalt.totalHits / 40;
    if (pixabayService.page > max_page) {
      loadMoreButton.hide();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
  }
}

// function onButtonLoadMoreClick() {
//   pixabayService.fetchImages().then(resalt => {
//     renderGalery(resalt.hits);
//     const totalHits = resalt.totalHits;
//     const max_page = totalHits / 40;
//     if (pixabayService.page > max_page) {
//       loadMoreButton.hide();
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//   });
// }

function renderGalery(data) {
  refs.gallery.insertAdjacentHTML('beforeend', images(data));
}

function clearGalery() {
  refs.gallery.innerHTML = '';
  loadMoreButton.hide();
}
// ==============================================
// / const img = res.hits;
// console.log(img);
// const totalHits = res.totalHits;
// console.log(totalHits);
// ==============================================

// loadBtn.button.addEventListener('click', onButtonLoadMoreClick);
// const loadBtn = {
//   button: document.querySelector('.load-more'),
//   show() {
//     this.button.classList.remove('is-hidden');
//     console.log('кнопка появилась');
//   },
//   hide() {
//     this.button.classList.add('is-hidden');
//     console.log('кнопка спряталась');
//   },
// };
// loadBtn.hide();
// ==============================================
// <!-- другое решение -->

// import Notiflix from 'notiflix';
// import imgTemplate from './templates/image.hbs';
// import fetchApiByName from './pixabay-service';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const API = new fetchApiByName();
// const lightbox = new SimpleLightbox('.photo-link', {
//   overlayOpacity: 0.4,
//   animationSpeed: 100,
// });

// const refs = {
//   form: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   showMoreBtn: document.querySelector('.load-more '),
// };

// refs.form.addEventListener('submit', onSearchForm);
// refs.showMoreBtn.addEventListener('click', onShowMore);

// async function onSearchForm(e) {
//   e.preventDefault();

//   const inputValue = e.currentTarget.elements.searchQuery.value;

//   if (inputValue === '') {
//     chekInputNotEmpty();
//     return;
//   }

//   API.resetPage();
//   API.queryValue(inputValue);

//   try {
//     const result = await API.fetchDataFromPixabay();

//     resetMarkup();
//     rewrightMarkup(result);

//     API.setTotalHits(result.data.totalHits);
//     lightbox.refresh();
//     Notiflix.Notify.success(`Hooray! We found ${API.totalHits} images.`);

//     showShowMoreBtn();
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.',
//     );
//   }
// }

// async function onShowMore() {
//   API.increasePage();

//   if (API.totalHits <= 20) {
//     chekEndOfTotalHits();
//     return;
//   }

//   const result = await API.fetchDataFromPixabay();

//   rewrightMarkup(result);
//   scrollAfterShowMore();

//   API.lastTotalHits();
//   lightbox.refresh();
//   Notiflix.Notify.success(`Hooray! We found ${API.totalHits} images.`);
// }

// function rewrightMarkup(markup) {
//   refs.gallery.insertAdjacentHTML('beforeend', imgTemplate(markup));
// }

// function resetMarkup() {
//   refs.gallery.innerHTML = '';
// }

// function hideShowMoreBtn() {
//   refs.showMoreBtn.classList.add('is-hidden');
// }

// function showShowMoreBtn() {
//   refs.showMoreBtn.classList.remove('is-hidden');
// }

// function chekInputNotEmpty() {
//   Notiflix.Notify.failure('Please enter something in search field');

//   hideShowMoreBtn();
//   resetMarkup();
// }

// function chekEndOfTotalHits() {
//   hideShowMoreBtn();
//   Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
// }

// function scrollAfterShowMore() {
//   let verticalParams = 0;

//   const intervalId = setInterval(() => {
//     window.scrollBy(0, verticalParams);
//     verticalParams += 1;

//     if (verticalParams === 20) {
//       clearInterval(intervalId);
//     }
//   }, 20);
// }
