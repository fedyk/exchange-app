import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { API } from './servises/api/api';
import { createStore, Store } from './store';
import { Rates } from './servises/rates/rates';
import { defaultAccounts } from './constants';
import { ConnectedWidget } from './components/Widget';
import './App.css';

interface Props { }

class App extends React.Component {
  api: API
  store: Store
  rates: Rates

  constructor(props: Props) {
    super(props)
    this.api = new API()
    this.store = createStore({ accounts: defaultAccounts })
    this.rates = new Rates(this.api, this.store)
  }

  componentDidMount() {
    this.rates.syncRates()
  }

  componentWillUnmount() {
    this.rates.dispose()
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
