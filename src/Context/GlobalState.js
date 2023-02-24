import { createContext, useState } from "react";
export const GlobalContext = createContext();
export const GlobalProvider = (props) => {
  const [money, setMoney] = useState(10000000000);
  const [coinBuyModal, setCoinBuyModal] = useState(false);
  const [coinSellModal, setCoinSellModal] = useState(false);
  const [ownedCoins, setOwnedCoins] = useState([]);
  const [profitLoss, setProfitLoss] = useState([]);
  const [history, setHistory] = useState([]);
  const [coins, setCoins] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
    {
      name: "Etherium",
      symbol: "ETC",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
    {
      name: "Doge",
      symbol: "DOGE",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
    {
      name: "Busd",
      symbol: "BUSD",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
    {
      name: "Bnb",
      symbol: "BNB",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
    {
      name: "Ada",
      symbol: "ADA",
      id: "",
      url: "",
      piece: "",
      latestPrice: "",
    },
  ]);
  return (
    <GlobalContext.Provider
      value={{
        coinBuyModal: coinBuyModal,
        coinSellModal: coinSellModal,
        money: money,
        coins: coins,
        ownedCoins: ownedCoins,
        history: history,
        profitLoss: profitLoss,
        setMoney,
        setCoinBuyModal,
        setCoinSellModal,
        setCoins,
        setOwnedCoins,
        setHistory,
        setProfitLoss,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
