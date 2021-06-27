import React from 'react';
import { connect } from 'react-redux';
import { getRates } from '../helpers/get-rates';
import { RootState, setAccounts } from '../store';
import { addTransaction } from '../store/transactions/actions';
import { Account, Fx, Transaction } from '../types';
import './Widget.css';

interface ConnectedProps {
  fx: Fx
  accounts: Account[]
  transactions: Transaction[]
}

interface ConnectedDispachers {
  onAddTransaction(transaction: Transaction): void
  onSetAccounts(accounts: Account[]): void
}

interface Props extends ConnectedProps, ConnectedDispachers { }

interface State {
  from: string
  fromAccount?: Account
  to: string
  toAccount?: Account
}

export class Widget extends React.Component<Props, State> {
  fromInputRef: React.RefObject<HTMLInputElement>
  toInputRef: React.RefObject<HTMLInputElement>
  dateFormatter: Intl.DateTimeFormat
  transactionCounter: number

  constructor(props: Props) {
    super(props)

    let fromAccount
    let toAccount

    // pick first account by default
    if (props.accounts.length > 1) {
      fromAccount = props.accounts[0]
      toAccount = props.accounts[1]
    }

    this.state = {
      to: "",
      toAccount,
      from: "",
      fromAccount
    }

    this.fromInputRef = React.createRef()
    this.toInputRef = React.createRef()
    this.dateFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    })
    this.transactionCounter = 1
  }

  handleFromAccountChange(account: Account) {
    let toAccount = this.state.toAccount

    if (toAccount && toAccount.id === account.id) {
      toAccount = this.state.fromAccount
    }

    this.setState({
      fromAccount: account,
      toAccount: toAccount
    })
  }

  handleToAccountChange(account: Account) {
    let fromAccount = this.state.fromAccount

    if (fromAccount && fromAccount.id === account.id) {
      fromAccount = this.state.toAccount
    }

    this.setState({
      toAccount: account,
      fromAccount: fromAccount
    })
  }

  handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.isValidNumber(event.target.value)) {
      return
    }

    this.setState({
      from: event.target.value,
      to: ""
    })
  }

  handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.isValidNumber(event.target.value)) {
      return
    }

    this.setState({
      to: event.target.value,
      from: ""
    })
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !this.isExchangeDisabled) {
      this.handleExchange()
    }
  }

  handleExchange = () => {
    if (!this.state.fromAccount || !this.state.toAccount || !this.props.fx) {
      return
    }

    const from = Number(this.from.replace(",", "."))
    const to = Number(this.to.replace(",", "."))

    if (Number.isNaN(from) || Number.isNaN(to)) {
      return
    }

    const accounts: Account[] = []

    for (let i = 0; i < this.props.accounts.length; i++) {
      const account = this.props.accounts[i];

      if (account.id === this.state.fromAccount.id) {
        accounts.push({
          ...account,
          balance: account.balance - from
        })
      }
      else if (account.id === this.state.toAccount.id) {
        accounts.push({
          ...account,
          balance: account.balance + to
        })
      }
      else {
        accounts.push(account)
      }
    }

    this.props.onAddTransaction({
      id: this.transactionCounter++,
      title: `Converted from ${this.state.fromAccount.currency}`,
      from: from,
      fromCurrency: this.state.fromAccount.currency,
      fromCurrencySign: this.state.fromAccount.currencySign,
      to: to,
      toCurrency: this.state.toAccount.currency,
      toCurrencySign: this.state.toAccount.currencySign,
      createdAt: Date.now(),
    })

    this.props.onSetAccounts(accounts)

    this.setState({
      from: "",
      to: ""
    })
  }

  isValidNumber(value: string) {
    if (value.length === 0) {
      return true
    }

    if (/^\d+$/.test(value)) {
      return true
    }

    if (value.includes(".") && /^\d+\.\d*$/.test(value)) {
      return true
    }

    if (value.includes(",") && /^\d+,\d*$/.test(value)) {
      return true
    }

    return false
  }

  get from() {
    if (this.state.to && this.state.fromAccount && this.state.toAccount && this.props.fx) {
      const to = Number(this.state.to.replace(",", "."))

      if (!Number.isNaN(to)) {
        return (to / getRates(this.state.fromAccount.currency, this.state.toAccount.currency, this.props.fx)).toFixed(2)
      }
    }

    return this.state.from
  }

  get to() {
    if (this.state.from && this.state.fromAccount && this.state.toAccount && this.props.fx) {
      const from = Number(this.state.from.replace(",", "."))

      if (!Number.isNaN(from)) {
        return (from * getRates(this.state.fromAccount.currency, this.state.toAccount.currency, this.props.fx)).toFixed(2)
      }
    }

    return this.state.to
  }

  get isExchangeDisabled() {
    if (!this.state.fromAccount || !this.state.toAccount || !this.props.fx) {
      return true
    }

    const from = Number(this.from || 0)

    if (Number.isNaN(from) || from === 0) {
      return true
    }

    if (this.state.fromAccount.balance < from) {
      return true
    }

    return false
  }

  render() {
    return (<div className="container">
      <div className="widget">
        <div className="account">
          <div className="tabs">
            {this.props.accounts.map(account => (
              <button
                key={account.id}
                className={`tab ${account.id === this.state.fromAccount?.id ? "active" : ""}`}
                onClick={() => this.handleFromAccountChange(account)}
              >{account.currency}</button>
            ))}
          </div>
          <div className="input-box" onClick={() => this.fromInputRef.current?.focus()}>
            <div className="input-box-body">
              {this.from && <span className="exchange-direction">-</span>}
              <div className="dynamic-input">
                <span className="dynamic-input-space-keeper">{this.from}</span>
                <input type="text" className="dynamic-input-control" value={this.from} onKeyDown={this.handleKeyDown} onChange={this.handleFromChange} maxLength={10} ref={this.fromInputRef} />
              </div>
            </div>
            <div className="input-box-footer">
              <div className="hint">{this.state.fromAccount ? `You have ${this.state.fromAccount.currencySign}${this.state.fromAccount.balance}` : ""}</div>
            </div>
          </div>
        </div>

        <div className="account">
          <div className="tabs">
            {this.props.accounts.map(account => (
              <button key={account.currency} className={`tab ${account.id === this.state.toAccount?.id ? "active" : ""}`} onClick={() => this.handleToAccountChange(account)}>{account.currency}</button>
            ))}
          </div>
          <div className="input-box" onClick={() => this.toInputRef.current?.focus()}>
            <div className="input-box-body">
              {this.to && <span className="exchange-direction">+</span>}
              <div className="dynamic-input">
                <span className="dynamic-input-space-keeper">{this.to}</span>
                <input type="text" className="dynamic-input-control" value={this.to} onKeyDown={this.handleKeyDown} onChange={this.handleToChange} maxLength={10} ref={this.toInputRef} />
              </div>
            </div>
            <div className="input-box-footer">
              <div className="hint">{this.state.toAccount ? `You have ${this.state.toAccount.currencySign}${this.state.toAccount.balance}` : ""}</div>
              <div className="hint">{this.renderRate()}</div>
            </div>
          </div>
        </div>

        <div className="widget-footer">
          <button className="primary-btn" disabled={this.isExchangeDisabled} onClick={this.handleExchange}>Exchange</button>
        </div>
      </div>

      {this.props.transactions.length > 0 &&
        <div className="transactions">
          {this.props.transactions.map(transaction => (
            <div className="transaction" key={transaction.id}>
              <div className="transaction-row">
                <div className="transaction-primary-cell">{transaction.title}</div>
                <div className="transaction-primary-cell">+{transaction.fromCurrencySign}{transaction.from}</div>
              </div>
              <div className="transaction-row">
                <div className="transaction-secondary-cell">{this.dateFormatter.format(transaction.createdAt)}</div>
                <div className="transaction-secondary-cell accent">-{transaction.toCurrencySign}{transaction.to}</div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>);
  }

  renderRate() {
    if (!this.state.fromAccount || !this.state.toAccount || !this.props.fx) {
      return ""
    }

    const rates = getRates(this.state.fromAccount.currency, this.state.toAccount.currency, this.props.fx)

    return `${this.state.fromAccount.currencySign}1 = ${this.state.toAccount.currencySign}${rates.toFixed(2)}`
  }
}

// @ts-ignore
const withConnect = connect<ConnectedProps, ConnectedDispachers>(function (state: RootState) {
  return {
    fx: state.fx,
    accounts: state.accounts,
    transactions: state.transactions,
  }
}, function (dispatch) {
  return {
    onAddTransaction(transaction: Transaction) {
      dispatch(addTransaction(transaction))
    },
    onSetAccounts(accounts: Account[]) {
      dispatch(setAccounts(accounts))
    }
  }
})

// @ts-ignore
export const ConnectedWidget: React.ComponentClass<{}> = withConnect(Widget)
