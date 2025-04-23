import { createRoot } from "react-dom/client"
import App from "./components/App"
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./components/Error";
import CountriesDetail from "./components/CountriesDetail";
import MainContainer from "./components/MainContainer"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            errorElement: <Error />,
            children: [{
                path: "/",
                element: <MainContainer />
            },
            {
                path: "/:country",
                element: <CountriesDetail />
            }
            ]
        },
    ]
)
const root = document.getElementById("root")
createRoot(root).render(<RouterProvider router={router} />);