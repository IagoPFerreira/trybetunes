const getMusics = async (id, props) => {
  try {
    const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
    const requestJson = await request.json();
    return requestJson.results;
  } catch (erro) {
    props.history.push('/not-found');
  }
};

export default getMusics;
