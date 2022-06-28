import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner';
import Card from '../components/card';

import { fetchCoffeeStores } from '../lib/coffee-stores';

export default function Home({ storeList }) {
  const handleOnBannerBtnClick = () => {
    console.log('Btn Pressed');
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover coffee stores" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={'View stores nearby'} handleOnClick={handleOnBannerBtnClick} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero image" />
        </div>
        {storeList.length && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near Me</h2>
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
  const coffeeStores = await fetchCoffeeStores('23.1005156,72.5373776', 'coffee', 8);

  return {
    props: { storeList: coffeeStores },
  };
}
