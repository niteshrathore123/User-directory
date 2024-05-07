import App from "../App";
import UserDetails from "../Components/UserDetails";
import { createBrowserRouter } from "react-router-dom";

export const appRouter=createBrowserRouter([
    {
        path:'/',
        element: <App />,
    },
    {
        path:'/userDetails/:userId',
        element:<UserDetails />
    },
])