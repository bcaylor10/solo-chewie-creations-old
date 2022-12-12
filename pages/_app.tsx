import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';

import BaseLayout from '@/layouts/BaseLayout';
import rootReducer from '@/redux/index';
import Maintenance from '../maintenance';
import MantineStyles from '@/layouts/MantineStyles';

import '../styles/app.scss';

export const queryClient = new QueryClient();
const store = configureStore({ reducer: rootReducer });

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const matches = useMediaQuery('(max-width: 768px)');

  if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') return <Maintenance />;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineStyles>
          <NotificationsProvider position={matches ? 'bottom-center' : 'bottom-right'}>
            <BaseLayout>
              <Component key={router.asPath} {...pageProps} />
            </BaseLayout>
          </NotificationsProvider>
        </MantineStyles>
      </Provider>
    </QueryClientProvider>
  )
}