import React from "react";
import "./Tabs.css";

interface Props {
  items: string[]
  selectedIndex: number
  onSelect(index: number): void
}

export function Tabs(props: Props) {
  return (
    <div className="tabs">
      {props.items.map((item, index) => {
        const className = `tab ${index === props.selectedIndex ? "active" : ""}`
        const handleClick = () => props.onSelect(index)

        return (
          <button key={index} className={className} onClick={handleClick} data-role="tab-item">{item}</button>
        )
      })}
    </div>
  )
}
