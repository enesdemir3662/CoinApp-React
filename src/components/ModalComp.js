import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GlobalContext } from "../Context/GlobalState";
import toast from "react-hot-toast";

function ModelExample({ coin_, setCoin_ }) {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const [readonlyControl, setReadonlyControl] = useState([false, false]);
  const {
    coinSellModal,
    coinBuyModal,
    coins,
    history,
    setHistory,
    profitLoss,
    money,
    ownedCoins,
    setProfitLoss,
    setCoinBuyModal,
    setCoinSellModal,
    setCoins,
    setMoney,
    setOwnedCoins,
  } = useContext(GlobalContext);

  const [textModal, setTextModal] = useState({
    price: "",
    piece: "",
  });

  const toggle = () => {
    setCoinBuyModal(false);
    setCoinSellModal(false);
    setCoin_({
      name: "",
      category: "bos",
      piece: "",
      price: "",
      originalPrice: "",
    });
    setTextModal({
      piece: "",
      price: "",
    });
  };

  //Window Onload
  useEffect(() => {
    coins.forEach((val, ind) => {
      val.url = `https://rest.coinapi.io/v1/exchangerate/${val.symbol}/USD?apikey=B5DE97E7-74E4-432F-8257-F34923CF5F87 `;
      val.id = ind + 1;
      return setCoins(coins);
    });
  }, []);

  //Sell Coin Control
  useEffect(() => {
    if (coinSellModal == true) {
      onChange(coin_.category, "Category");
    }
  }, [coinSellModal]);

  //Modal inputs change
  const onChange = (text, name_) => {
    // inputRef2.current.readOnly(true);
    switch (name_) {
      case "piece":
        if (coin_.name == "") {
          toast.error("İlk önce bir coin seçin!");
        } else {
          setTextModal((prev) => ({ ...prev, piece: text }));
          setReadonlyControl([false, true]);
          coin_ = {
            name: coin_.name,
            category: coin_.category,
            piece: text,
            price: text * coin_.buyCoin,
            buyCoin: coin_.buyCoin,
          };
          setCoin_(coin_);

          if (text == "") {
            setReadonlyControl([false, false]);
            coin_ = {
              name: coin_.name,
              category: coin_.category,
              piece: "",
              price: "",
              buyCoin: coin_.buyCoin,
            };
            setCoin_(coin_);
          }
        }
        break;
      case "price":
        if (coin_.name == "") {
          toast.error("İlk önce bir coin seçin!");
        } else {
          setTextModal((prev) => ({ ...prev, price: text }));
          setReadonlyControl([true, false]);
          coin_ = {
            name: coin_.name,
            category: coin_.category,
            piece: text / coin_.buyCoin,
            price: text,
            buyCoin: coin_.buyCoin,
          };
          setCoin_(coin_);

          if (text == "") {
            setReadonlyControl([false, false]);
            coin_ = {
              name: coin_.name,
              category: coin_.category,
              piece: "",
              price: "",
              buyCoin: coin_.buyCoin,
            };
            setCoin_(coin_);
          }
        }
        break;
      case "bos":
        coin_ = {
          name: "",
          category: "bos",
          piece: "",
          price: "",
          buyCoin: "",
        };
        setCoin_(coin_);
        break;
      default:
        coin_ = {
          name: coin_.name,
          category: text,
          piece: coin_.piece,
          price: coin_.price,
          buyCoin: coin_.buyCoin,
        };
        setCoin_(coin_);
        // eğer api dolarsa fetch i kaptın burayı açın
        // coins[text].latestPrice = 1;
        // coin_ = {
        //   name: coins[text].name,
        //   category: coin_.category,
        //   piece: coin_.piece,
        //   price: coin_.price,
        //   buyCoin: 1,
        // };
        // setCoin_(coin_);

        // fetch
        fetch(coins[text].url)
          .then((response) => response.json())
          .then((responseJson) => {
            coins[text].latestPrice = responseJson.rate;
            coin_ = {
              name: coins[text].name,
              category: coin_.category,
              piece: coin_.piece,
              price: coin_.price,
              buyCoin: responseJson.rate,
            };
            setCoin_(coin_);
            return;
          })
          .then((error) => {
            console.log(error);
          });

        break;
    }
  };

  //Buy Coin
  const Buy = () => {
    if (textModal.piece !== "" || textModal.price !== "") {
      let result = ownedCoins.find((element) => {
        return element.name === coin_.name;
      });
      if (coinBuyModal === true) {
        setHistory([
          ...history,
          {
            name: coin_.name,
            buyCoin: coin_.buyCoin,
            remainingMoney: money - coin_.price,
            piece: coin_.piece,
            type: "Alış",
          },
        ]);
        if (result === undefined) {
          if (ownedCoins.length === 0) {
            setOwnedCoins([
              ...ownedCoins,
              {
                name: coin_.name,
                piece: coin_.piece,
                id: 1,
              },
            ]);
          } else {
            setOwnedCoins([
              ...ownedCoins,
              {
                name: coin_.name,
                piece: coin_.piece,
                id: ownedCoins[ownedCoins.length - 1].id + 1,
              },
            ]);
          }
        } else {
          let newOwnedCoins = ownedCoins.filter((val) => {
            if (val.name === coin_.name) {
              val.piece = parseFloat(val.piece) + parseFloat(coin_.piece);
            }
            return ownedCoins;
          });
          setOwnedCoins(newOwnedCoins);
        }
        setMoney(money - coin_.price);
        toast.success("Başarıyla Satın Alındı!");
      } else {
        if (parseFloat(result.piece) < parseFloat(coin_.piece)) {
          toast.error(
            "Elinizde bulunan miktardan fazla coin satmaya çalıştınız!"
          );
        } else {
          let result2 = history.filter((val) => {
            return val.name === coin_.name;
          });
          setProfitLoss([
            ...profitLoss,
            {
              name: coin_.name,
              buyCoin: result2[result2.length - 1].buyCoin,
              sellCoin: coin_.buyCoin,
              piece: coin_.piece,
            },
          ]);
          setHistory([
            ...history,
            {
              name: coin_.name,
              buyCoin: coin_.buyCoin,
              remainingMoney: money - coin_.price,
              piece: coin_.piece,
              type: "Satış",
            },
          ]);
          let control = false;
          let newOwnedCoins = ownedCoins.filter((val) => {
            if (val.name === coin_.name) {
              val.piece = parseFloat(val.piece) - parseFloat(coin_.piece);
              if (val.piece <= 0) {
                control = true;
              }
            }
            return ownedCoins;
          });
          if (control === true) {
            newOwnedCoins = ownedCoins.filter((val) => {
              return val.name !== coin_.name;
            });
          }
          setOwnedCoins(newOwnedCoins);
          setMoney(money + coin_.price);
          toast.success("Başarıyla Satıldı!");
        }
      }
      toggle();
    } else {
      toast.error("Gerekli bilgileri lütfen doldurun!");
    }
  };

   //Modal
  return (
    <div>
      <Modal isOpen={coinSellModal || coinBuyModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {coinBuyModal == true ? "Coin Al" : "Coin Sat"}
        </ModalHeader>
        <ModalBody>
          <br />
          <input
            type="text"
            defaultValue={coin_.name}
            className={"form-control"}
            readOnly
          />
          <br />
          <input
            type="number"
            defaultValue={coin_.buyCoin}
            className={"form-control"}
            readOnly
          />
          <br />
          <div className="input-group mb-3 mt-4">
            <span className="input-group-text">Adet</span>
            <input
              type="number"
              onChange={(e) => onChange(e.target.value, "piece")}
              className={"form-control"}
              value={coin_.piece}
              ref={inputRef1}
              readOnly={readonlyControl[0]}
            />
            <span className="input-group-text">Fiyat</span>
            <input
              type="number"
              onChange={(e) => onChange(e.target.value, "price")}
              className={"form-control"}
              value={coin_.price}
              ref={inputRef2}
              readOnly={readonlyControl[1]}
            />
          </div>
          <br />
          <FormControl sx={{ minWidth: 120 }} style={{ width: "465px" }}>
            <Select
              value={coin_.category}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="bos" onClick={() => onChange("bos", "bos")}>
                <em>Bitcoin Seçin</em>
              </MenuItem>
              {coins.map((val, ind) => (
                <MenuItem
                  value={ind}
                  onClick={() => onChange(ind, "Category")}
                  key={val + ind + ind}
                >
                  {val.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Kapat
          </Button>
          <Button color="primary" onClick={() => Buy()}>
            {coinBuyModal == true ? "Satın Al" : "Sat"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModelExample;
