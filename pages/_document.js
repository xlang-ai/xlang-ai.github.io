// _document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Xlang AI',
  description: 'Xlang',
};

class _Document extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
