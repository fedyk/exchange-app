import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import { OpenExchangeRates } from "./servises/open-exchange-rates/open-exchange-rates";
import { createStore, Store } from "./store";
import { RatesSync } from "./servises/rates-sync/rates-sync";
import { defaultAccounts, fallbackRates } from "./constants";
import { ConnectedWidget } from "./components/Widget";
import { RatesStatus } from "./types";
import "./App.css";

interface Props { }

class App extends React.Component {
  api: OpenExchangeRates
  store: Store
  ratesSync: RatesSync

  constructor(props: Props) {
    super(props)
    this.api = new OpenExchangeRates()
    this.store = createStore({
      accounts: defaultAccounts,
      rates: {
        rates: fallbackRates, // openexchangerates limits can be excosted, have a defaul fallback will improve demo experience
        status: RatesStatus.Unknown,
      }
    })
    this.ratesSync = new RatesSync(this.api, this.store)
  }

  componentDidMount() {
    this.ratesSync.startSync()
  }

  componentWillUnmount() {
    this.ratesSync.stopSync()
  }

  render() {
    return (
      <ReactReduxProvider store={this.store}>
        <ConnectedWidget />
      </ReactReduxProvider>
    );
  }
}

export default App;
