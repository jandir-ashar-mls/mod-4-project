export const renderShowsCollection = (shows) => {
  const ul = document.querySelector('#shows-list')
  const count = document.querySelector('#shows-count');
  count.textContent = shows.length;
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  const favorites = getFavorites();

  shows.forEach(item => {
    const show = item.show ? item.show : item
    if(!show.image?.original || !show.image?.medium) return;

    const isFavorite = favorites.some((favorite) => favorite.id === show.id);
    const li = document.createElement('li')
    li.dataset.id = show.id

    const favoriteBtn = document.createElement('button');
    favoriteBtn.textContent = '★';
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.dataset.favorited = isFavorite;

    if (show.image && show.image.original) {
      const img = document.createElement('img')
      img.src = show.image.original || show.image.medium;
      img.alt = show.name
      li.appendChild(img)
    }

    const title = document.createElement('h3')
    title.textContent = show.name || 'Untitled'
    li.appendChild(title)

    const rating = document.createElement('p')
    rating.textContent = `⭐️ ${show.rating?.average ?? 'N/A'}`
    li.appendChild(rating)
    li.append(favoriteBtn);

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
  const showFavoriteBtn = document.querySelector('#show-favorite');

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

  const isFavorited = getFavorites().some((favorite) => favorite.id === tvShow.id);
  showFavoriteBtn.dataset.favorited = isFavorited;
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


export const getFavorites = () => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }
  catch {
    localStorage.removeItem('favorites');
    return [];
  }
};

export const toggleFavorite= (show) => {
  const favorites = getFavorites();
  const index = favorites.findIndex((favorite) => favorite.id === show.id);

  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(show);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const renderFavorites = () => {
  const favorites = getFavorites();
  renderShowsCollection(favorites);
}
