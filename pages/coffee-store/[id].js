import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { StoreContext } from '../../store/store-context';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { isEmpty } from '../../utils';

const CoffeeStore = ({ coffeeStore }) => {
  const { query, isFallback } = useRouter();
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const [store, setStore] = useState(coffeeStore);

  const { id } = query;

  const { address, name, imgUrl } = store;

  const handleUpvoteBtn = () => {
    console.log('Clicked');
  };

  useEffect(() => {
    if (isEmpty(coffeeStore)) {
      if (coffeeStores.length) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setStore(findCoffeeStoreById);
      }
    } else {
      setStore(coffeeStore);
    }
  }, [coffeeStores, coffeeStore, id]);

  if (isFallback) {
    return <div>Loading..</div>;
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={classNames('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" alt="places icon" />
              <p className={styles.text}>{address.formatted_address || address.address}</p>
            </div>
          )}
          {address?.cross_street && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="near me icon" />
              <p className={styles.text}>{address.cross_street}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="star icon" />
            <p className={styles.text}>{1}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteBtn}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
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

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}
