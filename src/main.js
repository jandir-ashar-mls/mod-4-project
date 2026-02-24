import { renderShowsCollection, renderSingleShowDetails, renderTopPick } from './dom-helpers';
import { getAllShows, getShowById } from './fetch-helpers';

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');
const refreshPickButton = document.querySelector('#refresh-pick')
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

showsList.addEventListener('click', (event) => {
  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;

  const tvShowId = clickedLi.dataset.id;

  const { data, error } = getShowById(tvShowId);
  
  if (error) {
    return;
  }
  renderSingleShowDetails(data);
});

// Hide modal/details when user clicks on the button
closeButton.addEventListener('click', () => {
  showDetails.classList.add('hidden');
});
