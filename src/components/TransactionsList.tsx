import React from 'react';
import { connect } from 'react-redux';
import { Transaction } from '../types';
import { formatMoney } from '../helpers/format-money';
import './TransactionsList.css'
import { RootState } from '../store';

interface Props {
  transactions: Transaction[]
}

export function TransactionsList(props: Props) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  })

  return props.transactions.length === 0
    ? (
      <div className="transactions-empty-state">Your upcoming transfers will appear here</div>
    )
    : (
      <div className="transactions">
        {props.transactions.map(t => (
          <div className="transaction" key={t.id}>
            <div className="transaction-row">
              <div className="transaction-primary-cell">{`Exchanged ${formatMoney(t.from, t.fromPrecision, t.fromCurrencySign)} to ${formatMoney(t.to, t.toPrecision, t.toCurrencySign)}`}</div>
              <div className="transaction-primary-cell accent">+{formatMoney(t.from, t.fromPrecision, t.fromCurrencySign)}</div>
            </div>
            <div className="transaction-row">
              <div className="transaction-secondary-cell">{dateFormatter.format(t.createdAt)}</div>
              <div className="transaction-secondary-cell">-{formatMoney(t.to, t.toPrecision, t.toCurrencySign)}</div>
            </div>
          </div>
        ))}
      </div>
    )
}

const withConnect = connect<Props, {}, {}, RootState>(function (state) {
  return {
    transactions: state.transactions
  }
})

export const ConnectedTransactionsList = withConnect(TransactionsList)
