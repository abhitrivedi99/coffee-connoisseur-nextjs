import { createApi } from 'unsplash-js';

const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

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

export const fetchCoffeeStores = async (query = 'coffee', limit = 12, latlong = '23.1005156,72.5373776') => {
  const photos = await fetchImages(limit);

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=10000&limit=${limit}`,
    options
  );

  const data = await response.json();

  return data?.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location,
      imgUrl: photos.length ? photos[index] : null,
      name: result.name,
    };
  });
};

export const fetchImages = async (limit = 12, query = 'coffee stores') => {
  const images = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: limit,
    orientation: 'portrait',
  });

  if (images?.status !== 200) return [];
  const unsplashResults = images.response.results;
  return unsplashResults.map((item) => item.urls.small);
};
