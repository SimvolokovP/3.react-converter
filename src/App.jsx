import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";
import { data } from "./data";

function App() {
  const [currentFromCurrency, setCurrentFromCurrency] = useState("RUB");
  const [currentToCurrency, setCurrentToCurrency] = useState("USD");
  const [fromNumber, setFromNumber] = useState(0);
  const [toNumber, setToNumber] = useState(1);
  const ratesRef = useRef({});

  // useEffect(() => {
  //   fetch('https://cdn.cur.su//api/latest.json').then((res) => res.json()).then((json) => {
  //     setratesRef.current(json.ratesRef.current);
  //   }).catch((err) => console.log(err))
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      // setratesRef.current(data.ratesRef.current)
      ratesRef.current = data.rates;
      changeToInput(1);
    }, 20);
  }, [])

  useEffect(() => {
    changeFromInput(fromNumber);
  }, [currentFromCurrency])

  useEffect(() => {
    changeToInput(toNumber);
  }, [currentToCurrency])

  function changeFromInput(value) {
    const price = value / ratesRef.current[currentFromCurrency];
    const result = price * ratesRef.current[currentToCurrency];
    setFromNumber(value);
    setToNumber(result);
  }

  function changeToInput(value) {
    const v = (ratesRef.current[currentFromCurrency] / ratesRef.current[currentToCurrency]) * value
    setFromNumber(v);
    setToNumber(value);
  }

  return (
    <div className="App">
      <Block
        value={fromNumber}
        currency={currentFromCurrency}
        onChangeCurrency={(cur) => setCurrentFromCurrency(cur)}
        onChangeValue={changeFromInput}
      />
      <Block
        value={toNumber}
        currency={currentToCurrency}
        onChangeCurrency={(cur) => setCurrentToCurrency(cur)}
        onChangeValue={changeToInput}
      />
    </div>
  );
}

export default App;
