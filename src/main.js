import { getFavorites, toggleFavorite, renderShowsCollection, renderSingleShowDetails, renderTopPick, renderFavorites } from './dom-helpers';
import { getAllShows, getShowById, searchShows } from './fetch-helpers';

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');
const refreshPickButton = document.querySelector('#refresh-pick');
const showContent = document.querySelector('#show-content');
const resetSearchButton = document.querySelector('#reset-search')
const favoritesButton = document.querySelector('#favorites-btn');
const showFavoriteBtn = document.querySelector('#show-favorite');

let cachedShows = []
let currentShows = [];
let viewingFavorites = false;

const getRandomTopRatedShow = (shows) => {
  const topRated = shows.filter(s => s.rating?.average >= 8.0)
  if (topRated.length === 0) return null
  return topRated[Math.floor(Math.random() * topRated.length)]
};

const loadShows = async () => {
  const { data, error } = await getAllShows()
  if (error) return;

  cachedShows = data
  currentShows = data
  renderShowsCollection(data)
  
  const pick = getRandomTopRatedShow(cachedShows)
  if (pick) renderTopPick(pick)
};

loadShows()

refreshPickButton.addEventListener('click', () => {
  const pick = getRandomTopRatedShow(cachedShows)
  if (pick) renderTopPick(pick)
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const searchTerm = searchInput.value.trim().toLowerCase()
  const { data, error } = await searchShows(searchTerm)
  
  if (error) return;
  viewingFavorites = false;
  currentShows = data;
  renderShowsCollection(data)
  searchForm.reset()
});

resetSearchButton.addEventListener('click', () => {
  searchForm.reset()
  viewingFavorites = false;
  currentShows = cachedShows;
  renderShowsCollection(cachedShows)
  window.scrollTo({ top: 0, behavior: 'smooth'})
});


const findShow = (showId) => {
  return currentShows.map((shape) => shape.show ?? shape).find((shape) => shape.id === showId) || getFavorites().find((shape) => shape.id === showId);
};

showsList.addEventListener('click', async (event) => {

  const favoriteBtn = event.target.closest('.favorite-btn');
  if (favoriteBtn) {
    const li = favoriteBtn.closest('li');
    const showId = Number(li.dataset.id);
    const show = findShow(showId);
    if (!show) return;

    toggleFavorite(show);
    const isFavorited = favoriteBtn.dataset.favorited === 'true';
    favoriteBtn.dataset.favorited = !isFavorited;

    if (viewingFavorites) {
      currentShows = getFavorites();
      renderFavorites();
    }
    return;
  }

  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;
  const tvShowId = clickedLi.dataset.id;

  const { data, error } = await getShowById(tvShowId);
  if (error) {
    showDetails.close();
    return;
  }
  renderSingleShowDetails(data);
  showDetails.dataset.currentId = tvShowId;
  showDetails.showModal();
});

// Hide modal/details when user clicks on the button
closeButton.addEventListener('click', () => {
  showDetails.close();
});

showDetails.addEventListener('click', (event) => {
  if(!showContent.contains(event.target)) {
    showDetails.close();
  }
});

favoritesButton.addEventListener('click', () => {
  viewingFavorites = !viewingFavorites;
  if (viewingFavorites) {
    currentShows = getFavorites();
    renderShowsCollection(currentShows);
  } else {
    currentShows = cachedShows;
    renderFavorites();
  }
});

showFavoriteBtn.addEventListener('click', () => {
  const isFavorited = showFavoriteBtn.dataset.favorited === 'true';
  const showId = Number(showDetails.dataset.currentId);
  const show = findShow(showId);
  if (!show) return;

  toggleFavorite(show);
  showFavoriteBtn.dataset.favorited = !isFavorited;

  viewingFavorites ? renderFavorites() : renderShowsCollection(currentShows);
});
