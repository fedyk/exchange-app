import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { formatMoney } from "../helpers/format-money";
import { getRates } from "../helpers/get-rates";
import { isNumber } from "../helpers/is-number";
import { parseMoney } from "../helpers/parse-money";
import { RootState, updateAccount } from "../store";
import { addTransaction } from "../store/transactions/actions";
import { Account, Rates, Transaction } from "../types";
import { DynamicInput } from "./DynamicInput";
import { Tabs } from "./Tabs";
import { createTransaction } from "../helpers/create-transaction";
import { TransactionsList } from "./TransactionsList";
import { SyncIcon } from "./SyncIcon";
import { Status } from "../store/rates/types";
import "./Widget.css";

interface ConnectedProps {
  rates: Rates | null
  status: Status
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

    if (!fromAccount || !toAccount || !this.props.rates) {
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

    this.props.onAddTransaction(createTransaction(from, to, fromAccount, toAccount))
    this.props.onUpdateAccount(fromAccount.id, { balance: (fromAccount.balance - from) })
    this.props.onUpdateAccount(toAccount.id, { balance: toAccount.balance + to })
    this.setState({ from: "", to: "" })
  }

  get rates() {
    const fromAccount = this.fromAccount
    const toAccount = this.toAccount

    if (!fromAccount || !toAccount || !this.props.rates) {
      return NaN;
    }

    return getRates(fromAccount.currency, toAccount.currency, this.props.rates)
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

    if (!fromAccount || !toAccount || !this.props.rates) {
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
            <div className="account-header" data-testid="from-account">
              <div className="account-title">Exchange</div>
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

          <div className="account" data-testid="to-account">
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

        <TransactionsList transactions={this.props.transactions} />
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

    const from = formatMoney(1 * Math.pow(10, fromAccount.precision), fromAccount.precision, fromAccount.currencySign)
    const to = formatMoney(1 * Math.floor(Math.pow(10, toAccount.precision) * rates), toAccount.precision, toAccount.currencySign)

    return (
      <span className="current-rates">
        {this.props.status === Status.Syncing && (
          <span title="Update exchange rates" className="current-rates-icon">
            <SyncIcon width={16} height={16} />
            </span>
        )}
        <span>{`${from} = ${to}`}</span>
      </span>
    )
  }
}

function mapStateToProps(state: RootState): ConnectedProps {
  return {
    rates: state.rates.rates,
    status: state.rates.status,
    accounts: state.accounts,
    transactions: state.transactions,
  }
}

// @ts-ignore
const withConnect = connect<ConnectedProps, ConnectedDispachers>(mapStateToProps, function (dispatch) {
  return {
    onAddTransaction: bindActionCreators(addTransaction, dispatch),
    onUpdateAccount: bindActionCreators(updateAccount, dispatch),
  }
})

// @ts-ignore
export const ConnectedWidget: React.ComponentClass<{}> = withConnect(Widget)
