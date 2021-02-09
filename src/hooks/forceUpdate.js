import React, { useState } from "react";
//create your forceUpdate hook
export function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
