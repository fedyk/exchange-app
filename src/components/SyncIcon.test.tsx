import React from "react";
import { render } from "@testing-library/react";
import { SyncIcon } from "./SyncIcon";

test("SyncIcon should render", () => {
  render(<SyncIcon width={512} height={512} />);
})
