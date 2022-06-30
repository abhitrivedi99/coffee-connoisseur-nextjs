// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { limit, latLong } = req.query;
    const response = await fetchCoffeeStores('coffee', limit, latLong);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'There was an error fetching coffee stores' });
  }
};

export default getCoffeeStoresByLocation;
