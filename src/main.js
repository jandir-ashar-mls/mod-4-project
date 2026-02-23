import { renderShowsCollection, renderSingleShowDetails, renderTopPick } from './dom-helpers';
import { getAllShows, getShowById } from './fetch-helpers';

const showsList = document.querySelector('#shows-list');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');
const refreshPickButton = document.querySelector('#refresh-pick')



const loadShows = async () => {
  const { data, error } = await getAllShows()
  if (error) return;

  renderShowsCollection(data)
  renderTopPick(data)
}

loadShows()

refreshPickButton.addEventListener('click', async () => {
  const { data, error } = await getAllShows()
  if (error) return
  renderTopPick(data)
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
