import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Table, Button } from "reactstrap";

function History() {
  const { history } = useContext(GlobalContext);

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin Adı</th>
            <th>Alış Fiyat</th>
            <th>Kalan Paranız</th>
            <th>Adet</th>
            <th>Tür</th>
          </tr>
        </thead>
        <tbody>
          {history.map((val, ind) => {
            return (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{val.name}</td>
                <td>{val.buyCoin}</td>
                <td>{val.remainingMoney}</td>
                <td>{val.piece}</td>
                <td>{val.type}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default History;
