import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Table, Button } from "reactstrap";

function ProfitLoss() {
  const { profitLoss } = useContext(GlobalContext);

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin Adı</th>
            <th>Alış Fiyat</th>
            <th>Satış Fiyatı</th>
            <th>Adet</th>
            <th>Kar-Zarar</th>
          </tr>
        </thead>
        <tbody>
          {profitLoss.map((val, ind) => {
            return (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{val.name}</td>
                <td>{val.buyCoin}</td>
                <td>{val.sellCoin}</td>
                <td>{val.piece}</td>
                <td
                  style={{
                    color: val.sellCoin - val.buyCoin > 0 ? "green" : "red",
                  }}
                >
                  {val.sellCoin - val.buyCoin}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default ProfitLoss;
