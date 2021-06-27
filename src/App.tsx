import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { API } from './api/api';
import './App.css';
import { ConnectedWidget } from './components/Widget';
import { defaultAccounts } from './constants';
import { Converter } from './controllers/converter';
import { createStore, Store } from './store';

interface Props { }

class App extends React.Component {
  api: API
  store: Store
  converter: Converter

  constructor(props: Props) {
    super(props)

    this.api = new API()
    this.store = createStore({
      accounts: defaultAccounts,
      transactions: [{
        id: 0,
        title: "converted fro USD",
        from: 1,
        fromCurrency: "USD",
        fromCurrencySign: "$",
        to: 2,
        toCurrency: "EUR",
        toCurrencySign: "€",
        createdAt: Date.now()
      }]
    })

    this.converter = new Converter(this.api, this.store)
  }

  componentDidMount() {
    this.converter.syncRates()
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
