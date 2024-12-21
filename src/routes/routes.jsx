import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home';
import Dashboard from '../layouts/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../dashboard/Products';
import CreateProduct from '../dashboard/CreateProduct';
import Users from '../dashboard/Users';
import Settings from '../dashboard/Settings';
import EditProduct from '../dashboard/EditProduct';
import ProductDetails from '../pages/ProductDetails';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import CategoryProduct from '../pages/CategoryProduct';
import ProductCollection from '../pages/ProductCollection';
import SellerRoute from './SellerRoute';
import AboutUs from '../pages/AboutUs';
import ContactPage from '../pages/ContactPage';

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/products/:id',
                element: <ProductDetails />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            {
                path: '/category/:category',
                element: <CategoryProduct />
            },
            {
                path: '/all-products/:type',
                element: <ProductCollection />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/sign_up',
                element: <SignUp />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/users',
                element: <AdminRoute><Users /></AdminRoute>
            },
            {
                path: '/dashboard/settings',
                element: <AdminRoute><Settings /></AdminRoute>
            },
            {
                path: '/dashboard/products',
                element: <SellerRoute><Products /></SellerRoute>
            },
            {
                path: '/dashboard/create_product',
                element: <SellerRoute><CreateProduct /></SellerRoute>
            },
            {
                path: '/dashboard/edit/:id',
                element: <SellerRoute><EditProduct /></SellerRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            }
        ]
    }
])

export default routes;