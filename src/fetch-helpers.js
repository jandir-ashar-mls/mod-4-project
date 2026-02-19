export const getAllShows = async () => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows')

    if (!response.ok){
      throw new Error('Failed to load TV Shows: ${response.status} ${response.statusText}')
    }
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.warn('An error occured while trying to retrieve TV Shows:', error.message)
    return { data: null, error }
  }
}



export const getShowById = async (tvShowId) => {
  try {
    const [showResponse, episodesResponse] = await Promise.all([fetch(`https://api.tvmaze.com/shows/${tvShowId}`), fetch(`https://api.tvmaze.com/shows/${tvShowId}/episodes`)]);
    if (!showResponse.ok) throw Error (`Fetch failed. ${showResponse.status} ${showResponse.statusText}`);
    if (!episodesResponse.ok) throw Error (`Fetch failed. ${episodesResponse.status} ${episodesResponse.statusText}`);

    const [ showData, episodesData ] = await Promise.all([showResponse.json(),episodesResponse.json()]);
    // Extract seasons and episodes
    const numSeasons = episodesData.length;
    const numEpisodes = episodesData.reduce((total, episode) => total + episode.number, 0);

    // save all data in an object
    const showObj = {
      image: showData.image.original,
      title: showData.name,
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
