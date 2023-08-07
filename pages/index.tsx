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
        <title>XLanG | Home</title>
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
