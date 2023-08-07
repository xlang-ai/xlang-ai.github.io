import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';

import Welcome from './components/Welcome';
import News from './components/News';
import Preview from './components/Preview';
import Sponsors from './components/Sponsors';

import { getHighlightSubProjects, getNews } from '@/utils/data';

const Home = ({
  news,
  subProj,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>XLANG Lab</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/white-on-black/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/white-on-black/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/white-on-black/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/white-on-black/site.webmanifest' />
      </Head>
      <div>
        <Welcome />
        <News news={news} />
        <Preview subProj={subProj} />
        <Sponsors />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const news = getNews();
  const subProj = getHighlightSubProjects();

  return {
    props: {
      news,
      subProj,
    },
  };
}

export default Home;
