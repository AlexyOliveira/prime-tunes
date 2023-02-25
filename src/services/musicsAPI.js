// const getMusics = async (id) => {
//   const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
//   const requestJson = await request.json();
//   return requestJson.results;
// };

// export default getMusics;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '02ea9ccd6bmsh828913e1c9f7cb3p10da61jsn5112cc0b5a52',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
};

const getMusics = async (albumId) => {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, options);
    const data = await response.json();
    const filterSongs = data.tracks.data;
    return filterSongs;
  } catch (error) {
    console.error(error);
  }
};

export default getMusics;
