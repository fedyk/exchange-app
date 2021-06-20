import React from 'react';
import './App.css';

function App() {
  return (
    <div className="widget">
      <div className="account account-source">
        <div className="tabs">
          <button className="tab active">USD</button>
          <button className="tab">EUR</button>
          <button className="tab">GBP</button>
        </div>
        <div className="input-box">
          <div className="input-box-body">
            <span className="exchange-direction">-</span>
            <input type="text" className="input" value="12.03" style={{ width: "5ch" }} />
          </div>
          <div className="input-box-footer">
            <div className="hint">You have $23.34</div>
          </div>
        </div>
      </div>

      <div className="account">
        <div className="tabs">
          <button className="tab active">USD</button>
          <button className="tab">EUR</button>
          <button className="tab">GBP</button>
        </div>
        <div className="input-box">
          <div className="input-box-body">
            <span className="exchange-direction">+</span>
            <input type="text" className="input" value="12.03" style={{ width: "5ch" }} />
          </div>
          <div className="input-box-footer">
            <div className="hint">You have $23.34</div>
            <div className="hint">€1 = $1.23</div>
          </div>
        </div>
      </div>

      <div className="widget-footer">
        <button className="primary-btn">Exchange</button>
      </div>
    </div>
  );
}

export default App;
