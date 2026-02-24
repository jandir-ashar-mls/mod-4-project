import { renderShowsCollection, renderSingleShowDetails, renderTopPick } from './dom-helpers';
import { getAllShows, getShowById } from './fetch-helpers';

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');
const refreshPickButton = document.querySelector('#refresh-pick')
const showContent = document.querySelector('#show-content');

let cachedShows = []

const getRandomTopRatedShow = (shows) => {
  const topRated = shows.filter(s => s.rating?.average >= 8.0)
  if (topRated.length === 0) return null
  return topRated[Math.floor(Math.random() * topRated.length)]
}

const loadShows = async () => {
  const { data, error } = await getAllShows()
  if (error) return;

  cachedShows = data
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

  renderShowsCollection(data)
  searchForm.reset()
})

showsList.addEventListener('click', async (event) => {
  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;
  const tvShowId = clickedLi.dataset.id;

  const { data, error } = await getShowById(tvShowId);
  if (error) {
    showDetails.close();
    return;
  }
  renderSingleShowDetails(data);
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
