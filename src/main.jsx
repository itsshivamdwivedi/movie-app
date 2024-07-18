import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme.js'; 
import App from './App.jsx';
import './index.css';
import Home from "./pages/Home.jsx"
import Search from "./pages/search/Search.jsx"
import DetailsPage from './DetailsPage.jsx';
import { AuthProvider } from './context/authProvider.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Protected from './component/routes/Protected.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/details/:id', 
        element: <DetailsPage />
      },
      {
        path: '/watchlist', // wrapping the watchlist with the protected route 
        element: (
          <Protected>
          <Watchlist />
          </Protected>
),
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />  
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);