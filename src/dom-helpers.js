export const renderShowsCollection = (shows) => {
  const ul = document.querySelector('#shows-list')
  const count = document.querySelector('#shows-count');
  count.textContent = shows.length;
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  shows.forEach(item => {
    const show = item.show ? item.show : item

    const li = document.createElement('li')
    li.dataset.id = show.id

    if (show.image && show.image.original) {
      const img = document.createElement('img')
      img.src = show.image.original
      img.alt = show.name
      li.appendChild(img)
    }

    const title = document.createElement('h3')
    title.textContent = show.name || 'Untitled'
    li.appendChild(title)

    const rating = document.createElement('p')
    rating.textContent = `⭐️ ${show.rating?.average ?? 'N/A'}`
    li.appendChild(rating)

    ul.appendChild(li)
  })
}

export const renderSingleShowDetails = (tvShow) => {
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
  showTitle.textContent = tvShow.title;
  showStreamed.textContent = tvShow.network;
  showRating.textContent = tvShow.rating;
  showSeasons.textContent = tvShow.seasons;
  showEpisodes.textContent = tvShow.episodes;
  showGenres.textContent = tvShow.genres;
  showStatus.textContent = tvShow.status;
  showSummary.innerHTML = tvShow.summary;
};

export const renderTopPick = (show) => {
  const topPickImage = document.querySelector('#top-pick-image')
  const topPickTitle = document.querySelector('#top-pick-title')
  const topPickRating = document.querySelector('#top-pick-rating')

  if (!show) return

  topPickImage.src = show.image?.original || ''
  topPickImage.alt = show.name || 'Top pick'
  topPickTitle.textContent = show.name || 'Untitled'
  topPickRating.textContent = `⭐ ${show.rating?.average ?? 'N/A'}`
};
