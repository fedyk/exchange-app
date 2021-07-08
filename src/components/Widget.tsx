import React from 'react';
import { connect } from 'react-redux';
import { formatMoney } from '../helpers/format-money';
import { getRates } from '../helpers/get-rates';
import { isNumber } from '../helpers/is-number';
import { parseMoney } from '../helpers/parse-money';
import { RootState, updateAccount } from '../store';
import { addTransaction } from '../store/transactions/actions';
import { Account, Fx, Transaction } from '../types';
import { DynamicInput } from './DynamicInput';
import { Tabs } from './Tabs';
import './Widget.css';

interface ConnectedProps {
  fx: Fx
  accounts: Account[]
  transactions: Transaction[]
}

interface ConnectedDispachers {
  onAddTransaction(transaction: Transaction): void
  onUpdateAccount(accountId: number, account: Partial<Account>): void
}

interface Props extends ConnectedProps, ConnectedDispachers { }

interface State {
  to: string,
  from: string,
  fromAccountIndex: number
  toAccountIndex: number
}

export class Widget extends React.Component<Props, State> {
  fromInputRef: React.RefObject<HTMLInputElement>
  toInputRef: React.RefObject<HTMLInputElement>
  dateFormatter: Intl.DateTimeFormat
  transactionCounter: number

  constructor(props: Props) {
    super(props)

    this.state = {
      to: "",
      from: "",
      fromAccountIndex: 0,
      toAccountIndex: 1,
    }

    this.fromInputRef = React.createRef()
    this.toInputRef = React.createRef()
    this.dateFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    })
    this.transactionCounter = 1
  }

  handleFromAccountChange(fromAccountIndex: number) {
    let toAccountIndex = this.state.toAccountIndex

    // swap accounts
    if (toAccountIndex === fromAccountIndex) {
      toAccountIndex = this.state.fromAccountIndex
    }

    this.setState({ fromAccountIndex, toAccountIndex })
  }

  handleToAccountChange(toAccountIndex: number) {
    let fromAccountIndex = this.state.fromAccountIndex

    // swap accounts
    if (fromAccountIndex === toAccountIndex) {
      fromAccountIndex = this.state.toAccountIndex
    }

    this.setState({ toAccountIndex, fromAccountIndex })
  }

  handleFromChange = (from: string) => {
    if (!isNumber(from)) {
      return
    }

    this.setState({
      from: from,
      to: ""
    })
  }

  handleToChange = (to: string) => {
    if (!isNumber(to)) {
      return
    }

    this.setState({
      to: to,
      from: ""
    })
  }

  handleExchange = () => {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount

    if (!fromAccount || !toAccount || !this.props.fx) {
      return
    }

    if (this.isExchangeDisabled) {
      return
    }

    const from = parseMoney(this.from, fromAccount.precision)
    const to = parseMoney(this.to, toAccount.precision)

    if (Number.isNaN(from) || Number.isNaN(to)) {
      return
    }

    this.props.onAddTransaction({
      id: this.transactionCounter++,
      title: `Exchange ${formatMoney(from, fromAccount.precision, fromAccount.currencySign)} to ${formatMoney(to, toAccount.precision, toAccount.currencySign)}`,
      from: from,
      fromPrecision: fromAccount.precision,
      fromCurrency: fromAccount.currency,
      fromCurrencySign: fromAccount.currencySign,
      to: to,
      toPrecision: toAccount.precision,
      toCurrency: toAccount.currency,
      toCurrencySign: toAccount.currencySign,
      createdAt: Date.now(),
    })

    this.props.onUpdateAccount(fromAccount.id, {
      balance: (fromAccount.balance - from)
    })

    this.props.onUpdateAccount(toAccount.id, {
      balance: toAccount.balance + to
    })

    this.setState({
      from: "",
      to: ""
    })
  }

  get rates() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount

    if (!fromAccount || !toAccount || !this.props.fx) {
      return NaN;
    }

    return getRates(fromAccount.currency, toAccount.currency, this.props.fx)
  }

  get from() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount
    const rates = this.rates

    if (this.state.to && fromAccount && toAccount && !Number.isNaN(rates)) {
      const to = parseMoney(this.state.to, toAccount.precision)
      const factor = Math.pow(10, fromAccount.precision)

      if (!Number.isNaN(to)) {
        return `${Math.floor(to / rates) / factor}`
      }
    }

    return this.state.from
  }

  get to() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount
    const rates = this.rates

    if (this.state.from && fromAccount && toAccount && !Number.isNaN(rates)) {
      const from = parseMoney(this.state.from, fromAccount.precision)
      const factor = Math.pow(10, toAccount.precision)

      if (!Number.isNaN(from)) {
        return `${Math.floor(from * rates) / factor}`
      }
    }

    return this.state.to
  }

  get isExchangeDisabled() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount

    if (!fromAccount || !toAccount || !this.props.fx) {
      return true
    }

    const from = parseMoney(this.from, fromAccount.precision)

    if (Number.isNaN(from) || from === 0) {
      return true
    }

    if (fromAccount.balance < from) {
      return true
    }

    return false
  }

  get fromAccount() {
    return this.props.accounts[this.state.fromAccountIndex]
  }

  get toAccount() {
    return this.props.accounts[this.state.toAccountIndex]
  }

  render() {
    const tabItems = this.props.accounts.map(account => account.currency)

    return (
      <div className="container">
        <div className="widget">
          <div className="account">
            <div className="account-header">
              <div className="account-title">Convert</div>
              <Tabs
                items={tabItems}
                selectedIndex={this.state.fromAccountIndex}
                onSelect={index => this.handleFromAccountChange(index)}
              />
            </div>
            <div className="input-box" onClick={() => this.fromInputRef.current?.focus()}>
              <div className="input-box-body">
                {this.from && <span className="exchange-direction">-</span>}
                <DynamicInput
                  value={this.from}
                  onChange={this.handleFromChange}
                  onEnterKeyDown={this.handleExchange}
                  inputRef={this.fromInputRef} autoFocus
                />
              </div>
              <div className="input-box-footer">
                <div className="hint">{this.fromAccount ? `You have ${formatMoney(this.fromAccount.balance, this.fromAccount.precision, this.fromAccount.currencySign)}` : ""}</div>
              </div>
            </div>
          </div>

          <div className="account">            
              <Tabs
                items={tabItems}
                selectedIndex={this.state.toAccountIndex}
                onSelect={index => this.handleToAccountChange(index)}
              />
            <div className="input-box" onClick={() => this.toInputRef.current?.focus()}>
              <div className="input-box-body">
                {this.to && <span className="exchange-direction">+</span>}
                <DynamicInput value={this.to} onChange={this.handleToChange} onEnterKeyDown={this.handleExchange} inputRef={this.toInputRef} />
              </div>
              <div className="input-box-footer">
                <div className="hint">{this.toAccount ? `You have ${formatMoney(this.toAccount.balance, this.toAccount.precision, this.toAccount.currencySign)}` : ""}</div>
                <div className="hint">{this.renderRate()}</div>
              </div>
            </div>
          </div>

          <div className="widget-footer">
            <button className="primary-btn" disabled={this.isExchangeDisabled} onClick={this.handleExchange}>Exchange</button>
          </div>
        </div>

        {
          this.props.transactions.length > 0 &&
          <div className="transactions">
            {this.props.transactions.map(t => (
              <div className="transaction" key={t.id}>
                <div className="transaction-row">
                  <div className="transaction-primary-cell">{t.title}</div>
                  <div className="transaction-primary-cell">+{formatMoney(t.from, t.fromPrecision, t.fromCurrencySign)}</div>
                </div>
                <div className="transaction-row">
                  <div className="transaction-secondary-cell">{this.dateFormatter.format(t.createdAt)}</div>
                  <div className="transaction-secondary-cell accent">-{formatMoney(t.to, t.toPrecision, t.toCurrencySign)}</div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }

  renderRate() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount
    const rates = this.rates

    if (!fromAccount || !toAccount || Number.isNaN(rates)) {
      return null
    }

    const from = formatMoney(Math.pow(10, fromAccount.precision), fromAccount.precision, fromAccount.currencySign)
    const to = formatMoney(Math.floor(Math.pow(10, toAccount.precision) * rates), toAccount.precision, toAccount.currencySign)

    return `${from} = ${to}`
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
    onUpdateAccount(accountId: number, account: Partial<Account>) {
      dispatch(updateAccount(accountId, account))
    }
  }
})

// @ts-ignore
export const ConnectedWidget: React.ComponentClass<{}> = withConnect(Widget)
