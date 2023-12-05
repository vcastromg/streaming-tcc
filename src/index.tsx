import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './pages/Home';
import Spotify from "./pages/Check/Spotify";
import Transfer from "./pages/Transfer/Transfer";
import Amazon from "./pages/Check/Amazon";
import Deezer from "./pages/Check/Deezer";
import Youtube from "./pages/Check/Youtube";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/check/spotify',
        element: <Spotify/>
      },
      {
        path: '/check/amazon',
        element: <Amazon/>
      },
      {
        path: '/check/deezer',
        element: <Deezer/>
      },
      {
        path: '/check/youtube',
        element: <Youtube/>
      },
      {
        path: '/transfer',
        element: <Transfer/>
      },
      {
        path: '/manage',
        // element: <Manage/>
      },
    ]
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RouterProvider router={router}/>
);
