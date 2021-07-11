import React from "react";
import "./DynamicInput.css";

interface Props {
  value: string
  inputRef?: React.RefObject<HTMLInputElement>
  autoFocus?: boolean
  onChange(value: string): void
  onEnterKeyDown?(): void
}

export function DynamicInput(props: Props) {
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && typeof props.onEnterKeyDown === "function") {
      props.onEnterKeyDown()
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof props.onChange === "function") {
      props.onChange(event.target.value)
    }
  }

  return (
    <div className="dynamic-input">
      <span className="dynamic-input-space-keeper">{props.value}</span>
      <input type="text" className="dynamic-input-control" value={props.value} onKeyDown={handleKeyDown} onChange={handleChange} maxLength={10} ref={props.inputRef} autoFocus={props.autoFocus} />
    </div>
  )
}
