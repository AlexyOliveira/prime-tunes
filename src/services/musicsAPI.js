// const getMusics = async (id) => {
//   const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
//   const requestJson = await request.json();
//   return requestJson.results;
// };

// export default getMusics;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c90f53e6ffmshcd77560895d6e69p11196cjsn662c2c0b5b05',
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
