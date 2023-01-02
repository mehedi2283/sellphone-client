import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/Routes/Routes";
import NavIndicator from './components/NavIndicator/NavIndicator';
const queryClient = new QueryClient();
function App() {
    return (
        <div className="">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={routes}></RouterProvider>
                <Toaster position="top-right" reverseOrder={false} />
                <NavIndicator></NavIndicator>
            </QueryClientProvider>
        </div>
    );
}

export default App;
