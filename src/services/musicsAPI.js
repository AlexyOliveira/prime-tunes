const getMusics = async (id) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=song`;
  const request = await fetch(proxyUrl + url);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
