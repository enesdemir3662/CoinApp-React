import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Button } from "reactstrap";
import Slider from "./Slider";
function Home() {
  const { setCoinBuyModal } = useContext(GlobalContext);
  return (
    <div>
      <Slider />
      <br />
      <div className="center">
        <Button type="button" onClick={() => setCoinBuyModal(true)}>
          Coin Satın Al
        </Button>
      </div>
    </div>
  );
}

export default Home;
