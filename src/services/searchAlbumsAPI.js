const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c90f53e6ffmshcd77560895d6e69p11196cjsn662c2c0b5b05',
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
