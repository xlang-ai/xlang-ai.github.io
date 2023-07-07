// _document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Header from './components/Header';

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
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
