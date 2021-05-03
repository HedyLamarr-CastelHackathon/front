/* eslint-disable react/jsx-props-no-spreading */
import 'styles/globals.css';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from 'components/Layout';

config.autoAddCss = false;
library.add(faGithub);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
