import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Nav, Button } from "reactstrap";
import ModalComp from "./ModalComp";

import { useNavigate, Link } from "react-router-dom";
function Header({ coin_, setCoin_ }) {
  const Navigate = useNavigate();
  const { money, coinBuyModal, coinSellModal } = useContext(GlobalContext);

  return (
    <div>
      {/* Modal Show */}
      {(coinBuyModal || coinSellModal) && (
        <ModalComp coin_={coin_} setCoin_={setCoin_} />
      )}
      {/* Navbar Show */}
      <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="link">
            Home
          </Link>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link
                to="/owned-coins"
                className="nav-item  active link"
                aria-current="page"
              >
                Sahip Olduğunuz
              </Link>
              <Link
                to="/history"
                className="nav-item  active link"
                aria-current="page"
              >
                Yapılan Tüm İşlemler
              </Link>
              <Link
                to="/profit-loss"
                className="nav-item  active link"
                aria-current="page"
              >
                Kâr Zarar
              </Link>
            </ul>
            <div
              className="price input-group-text"
              style={{ backgroundColor: "rgb(20, 17, 24)" }}
            >
              <span className="input-group-text">$</span>
              <p className="ms-5 mt-3 white-text">{money}</p>
              <p className="ms-5"></p>
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
}
export default Header;
