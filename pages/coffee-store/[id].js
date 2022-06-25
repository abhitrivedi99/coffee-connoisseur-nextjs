import { useRouter } from 'next/router';

import coffeeStores from '../../data/coffee-stores.json';

const CoffeeStore = (props) => {
  const router = useRouter();

  const { query } = router;

  if (router.isFallback) {
    return <div>Loading..</div>;
  } else {
    return <div>You are on page with {query.id}</div>;
  }
};

export default CoffeeStore;

export async function getStaticPaths() {
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}
