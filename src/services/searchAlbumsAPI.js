const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '02ea9ccd6bmsh828913e1c9f7cb3p10da61jsn5112cc0b5a52',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
};

const searchAlbumsAPI = async (artist) => {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search/?q=${artist}`, options);
    const data = await response.json();
    const filterAlbuns = data.data.map((each) => each.album);
    return filterAlbuns;
  } catch (error) {
    console.error(error);
  }
};

export default searchAlbumsAPI;