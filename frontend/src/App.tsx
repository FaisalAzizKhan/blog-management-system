import { BrowserRouter } from "react-router-dom";
import { RouteConfig } from "./Routes/MainRoutes/MainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./Store/ReduxToolkit/Store";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <RouteConfig />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
