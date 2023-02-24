import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Table, Button } from "reactstrap";

function OwnedCoins({ setCoin_ }) {
  const { ownedCoins, setCoinSellModal, coins } = useContext(GlobalContext);

  const sellCoin = (value) => {
    let category;
    coins.filter((val, index) => {
      if (val.name === value.name) {
        category = index;
      }
    });
    setCoin_({ ...value, category: category });
    setCoinSellModal(true);
  };
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin Adı</th>
            <th>Adet</th>
            <th>işlemler</th>
          </tr>
        </thead>
        <tbody>
          {ownedCoins.map((val, ind) => {
            return (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{val.name}</td>
                <td>{val.piece}</td>
                <td>
                  <Button
                    color="danger"
                    className="ms-2"
                    onClick={() => sellCoin(val)}
                  >
                    <i className="fa-solid fa-tag"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default OwnedCoins;
