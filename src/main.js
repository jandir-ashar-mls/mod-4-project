import { renderShowsCollection, renderSingleShowDetails } from './dom-helpers';
import { getAllShows, getShowById, searchShows } from './fetch-helpers';

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');
const showContent = document.querySelector('#show-content');

const loadShows = async () => {
  const { data, error } = await getAllShows()

  if (error){
    return;
  }
  renderShowsCollection(data)
}

loadShows()

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
  showDetails.showModal();
  const tvShowId = clickedLi.dataset.id;

  const { data, error } = await getShowById(tvShowId);

  if (error) {
    return;
  }
  renderSingleShowDetails(data);
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
