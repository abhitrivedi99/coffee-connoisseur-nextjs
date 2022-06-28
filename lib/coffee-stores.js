import { createApi } from 'unsplash-js';

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: FOURSQUARE_API_KEY,
  },
};

export const fetchCoffeeStores = async (latlong, query, limit) => {
  const photos = await fetchImages('coffee store', limit);

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=10000&limit=${limit}`,
    options
  );

  const data = await response.json();

  return data?.results.map((result, index) => {
    console.log(result);
    return {
      id: result.fsq_id,
      address: result.location,
      imgUrl: photos.length ? photos[index] : null,
      name: result.name,
    };
  });
};

export const fetchImages = async (query, limit) => {
  const images = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: limit,
    orientation: 'portrait',
  });

  const unsplashResults = images.response.results;

  return unsplashResults.map((item) => item.urls.small);
};
