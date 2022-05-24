import axios from 'axios';
import Notiflix from 'notiflix';

export default class PixabayService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    // console.log(this);
    return axios(
      `https://pixabay.com/api/?key=27599819-5f2242c0de29668fb10ee249b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`,
    ).then(resalt => {
      const data = resalt.data.hits;
      if (data.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      this.incrementPage();

      //   console.log(data);
      return data;
    });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// ===========================================

// <!-- другое решение -->

// const axios = require('axios');

// export default class fetchByName {
//   constructor() {
//     this.page = 1;
//     this.value = '';
//     this.totalHits = null;
//   }

//   async fetchDataFromPixabay() {
//     const BASIC_URL = 'https://pixabay.com/api/';
//     const URL_KEY = '27491593-aa922f21d022df769349f5779';
//     const queryString = `q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

//     const response = await axios.get(`${BASIC_URL}?key=${URL_KEY}&${queryString}`);

//     if (!response.data.total) {
//       throw new Error('error');
//     }
//     return response;
//   }

//   queryValue(newValue) {
//     this.value = newValue;
//   }

//   increasePage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   setTotalHits(hits) {
//     this.totalHits = hits;
//   }

//   lastTotalHits() {
//     this.totalHits -= 40;
//   }
// }
