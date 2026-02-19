import { renderShowsCollection, renderSingleShowDetails } from './dom-helpers';
import { getAllShows, getShowById } from './fetch-helpers';

let allShows = []

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');

const loadShows = async () => {
  const { data, error } = await getAllShows()

  if (error){
    return;
  }
  allShows = data
  renderShowsCollection(data)
}

loadShows()

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchTerm = searchInput.value.trim().toLowerCase()
  if (!searchTerm){
    renderShowsCollection(allShows)
    searchForm.reset()
    return
  }
  const filteredShows = allShows.filter(show =>
    show.name.toLowerCase().includes(searchTerm)
  )
  renderShowsCollection(filteredShows)

  searchForm.reset()
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
