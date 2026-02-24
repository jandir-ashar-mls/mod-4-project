import { getFavorites, toggleFavorite, renderShowsCollection, renderSingleShowDetails, renderTopPick } from './dom-helpers';
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
}

const loadShows = async () => {
  const { data, error } = await getAllShows()
  if (error) return;

  cachedShows = data
  currentShows = data
  renderShowsCollection(data)
  
  const pick = getRandomTopRatedShow(cachedShows)
  if (pick) renderTopPick(pick)
}

loadShows()

refreshPickButton.addEventListener('click', () => {
  const pick = getRandomTopRatedShow(cachedShows)
  if (pick) renderTopPick(pick)
})

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const searchTerm = searchInput.value.trim().toLowerCase()
  const { data, error } = await searchShows(searchTerm)
  
  if (error) return;
  viewingFavorites = false;
  currentShows = data;
  renderShowsCollection(data)
  searchForm.reset()
})

resetSearchButton.addEventListener('click', () => {
  searchForm.reset()
  viewingFavorites = false;
  currentShows = cachedShows;
  renderShowsCollection(cachedShows)
  window.scrollTo({ top: 0, behavior: 'smooth'})
})

showsList.addEventListener('click', async (event) => {

  const favoriteBtn = event.target.closest('.favorite-btn');
  if (favoriteBtn) {
    const li = favoriteBtn.closest('li');
    const showId = li.dataset.id;
    const show = currentShows.map((s) => s.show ?? s).find(s => s.id === showId)
      || getFavorites().find(s => s.id === showId);
    if (!show) return;

    toggleFavorite(show);
    const isFavorited = favoriteBtn.dataset.favorited === 'true';
    favoriteBtn.dataset.favorited = !isFavorited;
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
  const isViewingFavorites = !viewingFavorites;
  currentShows = viewingFavorites ? getFavorites() : cachedShows;
  if (isViewingFavorites) {
    renderShowsCollection(cachedShows);
    favoritesButton.dataset.view = 'all';
  } else {
    renderShowsCollection(getFavorites());
    favoritesButton.dataset.view = 'favorites';
  }
});



showFavoriteBtn.addEventListener('click', () => {
  const isFavorited = showFavoriteBtn.dataset.favorited === 'true';
  const showId = Number(showDetails.dataset.currentId);
  const show = cachedShows.find((show) => show.id === showId) || getFavorites().find((fav) => fav.id === showId);
  if (!show) return;

  toggleFavorite(show);
  showFavoriteBtn.dataset.favorited = !isFavorited;
  const isViewingFavorites = favoritesButton.dataset.view === 'favorites';
  renderShowsCollection(isViewingFavorites ? getFavorites() : cachedShows);
});
