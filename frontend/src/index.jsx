import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { BrowserRouter } from "react-router-dom"
import { PostGlobalProvider } from './PostGlobalProvider';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <QueryClientProvider client={queryClient}>
  <PostGlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PostGlobalProvider>
  </QueryClientProvider>


);
