import { Global, ThemeProvider } from '@emotion/react';
import theme from '@styles/theme';
import GlobalStyle from './styles/global';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import pageRoutes from '@routes/pageRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const router = createBrowserRouter([...pageRoutes]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <RouterProvider router={router} />
      </ThemeProvider>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;