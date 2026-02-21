import { renderSingleShowDetails } from './dom-helpers';
import { getShowById } from './fetch-helpers';

const showsList = document.querySelector('ul');
const closeButton = document.querySelector('#show-close-details');
const showDetails = document.querySelector('#show-details');

showsList.addEventListener('click', async (event) => {
  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;

  const tvShowId = clickedLi.dataset.id;

  const { data, error } = await getShowById(tvShowId);
  
  if (error) {
    return;
  }
  renderSingleShowDetails(data);
});

// Hide modal/details when user clicks on the button
closeButton.addEventListener('click', () => {
  showDetails.classList.add('hidden');
});


