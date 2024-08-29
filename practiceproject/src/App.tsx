import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import './App.css'
import LoginPage from './components/LoginPage'
import ViewPage, { loader as viewLoader } from './components/ViewPage'
import CreateMovie, { loader as createLoader } from './admin/Create'
import EditMovieComponent, { loader as editLoader } from './admin/EditMovie'
import Register from './components/Register'
import OrderHistory, { loader as orderHistoryLoader } from './components/OrderHistory'

const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/register', element: <Register/> },
    {
        path: '/home',
        element: <ViewPage />,
        loader: viewLoader
    },
    {
        path: '/newMovie',
        element: <CreateMovie />,
        loader: createLoader
    },
    {
        path: '/edit/:id',
        element: <EditMovieComponent />,
        loader: editLoader
    },
    {
        path: '/order-history',
        element: <OrderHistory />,
        loader: orderHistoryLoader
    }
])



function App() {


    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
