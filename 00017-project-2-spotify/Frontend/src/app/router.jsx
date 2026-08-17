import { createBrowserRouter } from 'react-router'
import Layout from '../shared/components/Layout.jsx'
import HomePage from '../features/home/pages/HomePage.jsx'
import LibraryPage from '../features/library/pages/LibraryPage.jsx'
import PlaylistPage from '../features/playlist/pages/PlaylistPage.jsx'
import AlbumPage from '../features/album/pages/AlbumPage.jsx'
import NotFoundPage from '../shared/pages/NotFoundPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'playlist/:id', element: <PlaylistPage /> },
      { path: 'album/:id', element: <AlbumPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])