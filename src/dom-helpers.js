export const renderRingleShowDetails = (tvShow) => {
  const showDetails = document.querySelector('#show-details');
  showDetails.classList.remove('hidden');

  const showImage = document.querySelector('#show-image');
  const showTitle = document.querySelector('#show-title');
  const showStreamed = document.querySelector('#show-streamed');
  const showRating = document.querySelector('#show-rating');
  const showSeasons = document.querySelector('#show-seasons');
  const showEpisodes = document.querySelector('#show-episodes');
  const showGenres = document.querySelector('#show-genres');
  const showStatus = document.querySelector('#show-status');
  const showSummary = document.querySelector('#show-summary');

  showImage.src = tvShow.image;
  showImage.alt = tvShow.title;
  showTitle.textContent = tvShow.name;
  showStreamed.textContent = tvShow.network;
  showRating.textContent = tvShow.rating;
  showSeasons.textContent = tvShow.seasons;
  showEpisodes.textContent = tvShow.episodes;
  showGenres.textContent = tvShow.genres;
  showStatus.textContent = tvShow.status;
  showSummary.textContent = tvShow.summary;
}