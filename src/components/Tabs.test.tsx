import React from "react";
import { render } from "@testing-library/react";
import { Tabs } from "./Tabs";

test("Tabs should render", () => {
  const tabs = render(<Tabs items={["test"]} selectedIndex={0} onSelect={() => { }} />);

  expect(tabs.getByText("test").className).toContain("active")
})

test("Tabs should call onSelect", () => {
  const handleSelect = jest.fn()
  const tabs = render(<Tabs items={["test1", "test2"]} selectedIndex={0} onSelect={handleSelect} />);

  tabs.getByText("test2").click()

  expect(handleSelect).toBeCalledWith(1)
})
