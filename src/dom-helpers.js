export const renderShowsCollection = (shows) => {
  const showsList = document.querySelector('#shows-list')
  showsList.innerHTML = ''

  shows.forEach(show => {
    const li = document.createElement('li')
    li.dataset.id = show.id
    li.classList.add('show-card')

    const img = document.createElement('img')
    img.src = show.image?.medium || ''
    img.alt = show.name

    const title = document.createElement('h3')
    title.textContent = show.name

    const rating = document.createElement('p')
    rating.textContent = `⭐️ ${show.rating?.average ?? 'N/A'}`

    li.append(img, title, rating)
    showsList.appendChild(li)
  })
}







export const renderSingleShowDetails = (tvShow) => {
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