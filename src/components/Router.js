import { useState, React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../Context/GlobalState";

//import Page
import Home from "./Home";
import History from "./History";
import ProfitLoss from "./ProfitLoss";
import Header from "./Header";
import OwnedCoins from "./OwnedCoins";

function Router() {
  const [coin_, setCoin_] = useState({
    name: "",
    category: "bos",
    piece: "",
    price: "",
    originalPrice: "",
  });
  return (
    <div>
      <BrowserRouter>
        <GlobalProvider>
          <Header coin_={coin_} setCoin_={setCoin_} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/owned-coins"
              element={<OwnedCoins setCoin_={setCoin_} />}
            />
            <Route path="/profit-loss" element={<ProfitLoss />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default Router;
