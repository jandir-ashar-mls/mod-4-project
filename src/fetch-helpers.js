export const getAllShows = async () => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows')

    if (!response.ok){
      throw new Error(`Failed to load TV Shows: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.warn('An error occured while trying to retrieve TV Shows:', error.message)
    return { data: null, error }
  }
}

const preloadImage = (src) => {
    return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = () => resolve('./img/loading-image.png');
    image.src = src;
    });
};

export const getShowById = async (tvShowId) => {
  try {
    const [showResponse, episodesResponse] = await Promise.all([fetch(`https://api.tvmaze.com/shows/${tvShowId}`), fetch(`https://api.tvmaze.com/shows/${tvShowId}/episodes`)]);
    if (!showResponse.ok) throw Error (`Fetch failed. ${showResponse.status} ${showResponse.statusText}`);
    if (!episodesResponse.ok) throw Error (`Fetch failed. ${episodesResponse.status} ${episodesResponse.statusText}`);

    const [ showData, episodesData ] = await Promise.all([showResponse.json(),episodesResponse.json()]);
    // Extract seasons and episodes
    const seasons = episodesData.map((episode) => episode.season);
    const numSeasons = Math.max(...seasons);
    const numEpisodes = episodesData.length;
    const imageSrc = await preloadImage(showData.image.original);
    // save all data in an object
    const showObj = {
      image: imageSrc,
      title: showData.name,
      network: showData.network?.name || showData.webChannel?.name || 'N/A',
      rating: showData.rating?.average || 'N/A',
      seasons: numSeasons,
      episodes: numEpisodes,
      genres: showData.genres.join(', '),
      status: showData.status,
      summary: showData.summary,
    }

    return { data: showObj, error: null };
  }
  catch (error) {
    console.warn(`An error occurred: ${error.message}`);
    return { data: null, error: error};
  }
};

export const searchShows = async (query) => {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    )
    if (!response.ok){
      throw new Error(`Search failed: ${response.status}`)
    }
    
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.warn('Error searching for shows:', error.message)
    return { data: null, error }
  }
}