import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StocksContainer from "./components/stock-page";
import QuotesPage from "./components/quotes-page";
import Navigation from "./components/navigation";
import PrivateRoutes from "./components/private-routes";
import { IsAuthProvider } from "./components/context/useIsAuthContext";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <IsAuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<StocksContainer />} />
            <Route element={<PrivateRoutes />}>
              <Route path="quotes-page" element={<QuotesPage />} />
            </Route>
          </Routes>
        </IsAuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
