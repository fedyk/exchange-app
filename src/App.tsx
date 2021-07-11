import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import { OpenExchangeRates } from "./servises/open-exchange-rates/open-exchange-rates";
import { createStore, Store } from "./store";
import { RatesSync } from "./servises/rates-sync/rates-sync";
import { defaultAccounts } from "./constants";
import { ConnectedWidget } from "./components/Widget";
import "./App.css";

interface Props { }

class App extends React.Component {
  api: OpenExchangeRates
  store: Store
  ratesSync: RatesSync

  constructor(props: Props) {
    super(props)
    this.api = new OpenExchangeRates()
    this.store = createStore({ accounts: defaultAccounts })
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
