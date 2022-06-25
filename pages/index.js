import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner';
import Card from '../components/card';

import coffeeStores from '../data/coffee-stores.json';

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
          <>
            <h2 className={styles.heading2}>Ahmedabad Stores</h2>
            <div className={styles.cardLayout}>
              {storeList.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  className={styles.card}
                  imgUrl={store.imgUrl}
                  href={`/coffee-store/${store.id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: { storeList: coffeeStores },
  };
}
