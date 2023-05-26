import { MainLayout } from '../layouts/MainLayout';
import { Provider } from 'react-redux';
import { store } from '../store';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}
