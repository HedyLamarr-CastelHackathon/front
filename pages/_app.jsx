/* eslint-disable react/jsx-props-no-spreading */
import 'styles/globals.css';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from 'components/Layout';
import { OverlayContentProvider } from 'contexts/overlay-context';
import Overlay from 'components/Overlay';

config.autoAddCss = false;
library.add(faGithub, faMapMarkerAlt, faComment);

function MyApp({ Component, pageProps }) {
  return (
    <OverlayContentProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Overlay />
    </OverlayContentProvider>
  );
}

export default MyApp;
