const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': 'https://prime-tunes-67si3cdtk-alexyoliveira.vercel.app',
    },
  });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
