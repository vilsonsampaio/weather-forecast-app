import React from "react";

import { GlobalStorage } from "./GlobalStorage";

import Header from "./components/Header";
import Card from "./components/Card/index";
import Input from "./components/Input";

import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <GlobalStorage>
          <Header />
          {<Card />}
          <Input />
        </GlobalStorage>
      </div>
      <Footer />
    </div>
  );
};

export default App;
