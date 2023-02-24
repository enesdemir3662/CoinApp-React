import { useState, React, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Router from "../src/components/Router";
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </div>
  );
}

export default App;
