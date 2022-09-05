import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import BaseLayout from '@/layouts/BaseLayout';
import rootReducer from '@/redux/index';

import '../styles/app.scss';

const queryClient = new QueryClient();
const store = configureStore({ reducer: rootReducer });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Provider store={store}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            fontFamily: 'Comfortaa',
            colors: {
              "turqoise": ["#E5FFFD", "#B8FFF9", "#8AFFF4", "#5CFFF0", "#2EFFEC", "#00FFE8", "#00CCBA", "#00998B", "#00665D", "#00332E"],
              "green": ["#EBF9F5", "#C8EEE4", "#A5E4D2", "#82D9C1", "#5ECFAF", "#3BC49E", "#2F9D7E", "#23765F", "#184E3F", "#0C2720"],
              "tan": ["#F9FCE8", "#EDF8BF", "#E2F396", "#D6EE6D", "#CBE944", "#BFE41B", "#99B715", "#738910", "#4C5B0B", "#262E05"],
              "dark-tan": ["#F4FAEA", "#E0F2C5", "#CCEA9F", "#B8E17A", "#A5D954", "#91D02F", "#74A725", "#577D1C", "#3A5313", "#1D2A09"],
              "dark-green": ["#1a5545"]
            },
            components: {
              Title: {
                styles: (theme) => ({
                  root: {
                    color: '#1a5545',
                    fontFamily: 'Comfortaa'
                  },
                }),
              },
              Text: {
                styles: (theme) => ({
                  root: {
                    color: '#1a5545',
                    fontFamily: 'Comfortaa'
                  },
                }),
              }
            }
          }}
        >
          <NotificationsProvider position="top-center">
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  )
}