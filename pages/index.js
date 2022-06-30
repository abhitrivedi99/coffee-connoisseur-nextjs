import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner';
import Card from '../components/card';

import { ACTION_TYPES, StoreContext } from '../store/store-context';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';

export default function Home({ storeList }) {
  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  const [error, setError] = useState(null);

  const { handleTrackLocation, locationErrMsg, isFindingLocation } = useTrackLocation();

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    if (latLong) {
      try {
        const fetchingData = async () => {
          const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
          const coffeeStores = await res.json();
          dispatch({ type: ACTION_TYPES.SET_COFFEE_STORES, payload: coffeeStores });
        };

        fetchingData();
      } catch (error) {
        setError(error.message);
      }
    }
  }, [latLong, dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover coffee stores" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Loading...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrMsg && <p>Something went wrong: ${locationErrMsg}</p>}
        {error && <p>Something went wrong: ${error}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero image" />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  className={styles.card}
                  imgUrl={
                    store.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${store.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {storeList.length && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Ahmedabad Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {storeList.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  className={styles.card}
                  imgUrl={
                    store.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${store.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: { storeList: coffeeStores },
  };
}
