
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="mobile-postman-app">
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
