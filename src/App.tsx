import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { API } from './api/api';
import './App.css';
import Widget from './components/Widget';
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
      accounts: defaultAccounts
    })

    this.converter = new Converter(this.api, this.store)
  }

  componentDidMount() {
    this.converter.syncRates()
  }

  render() {
    return (
      <ReactReduxProvider store={this.store}>
        <Widget />
      </ReactReduxProvider>
    );
  }
}

export default App;
