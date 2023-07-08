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
        <Head />
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
