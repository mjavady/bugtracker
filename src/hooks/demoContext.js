import { createContext } from "react";

export const DemoContext = createContext({
  username: "demo 1",
  role: "Admin",
  email: "demo@email.com",
  projects: [
    [
      "demoName 1",
      "demoDesc 1",
      "demoCreator 1",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 2",
      "demoDesc 2",
      "demoCreator 2",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 3",
      "demoDesc 3",
      "demoCreator 3",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 4",
      "demoDesc 4",
      "demoCreator 4",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 5",
      "demoDesc 5",
      "demoCreator 5",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 6",
      "demoDesc 6",
      "demoCreator 6",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 7",
      "demoDesc 7",
      "demoCreator 7",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 8",
      "demoDesc 8",
      "demoCreator 8",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 9",
      "demoDesc 9",
      "demoCreator 9",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 10",
      "demoDesc 10",
      "demoCreator 10",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
    [
      "demoName 11",
      "demoDesc 11",
      "demoCreator 11",
      <button className="btn waves-effect waves-light black yellow-text">
        More details
      </button>,
    ],
  ],
  tickets: [
    [
      "demoName 1",
      "demoDesc 1",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 1",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 2",
      "demoDesc 2",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 2",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 3",
      "demoDesc 3",
      "Error",
      "High",
      "On progress",
      "demoCreator 3",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 4",
      "demoDesc 4",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 4",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 5",
      "demoDesc 5",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 5",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 6",
      "demoDesc 6",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 6",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 7",
      "demoDesc 7",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 7",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 8",
      "demoDesc 8",
      "Unknown",
      "low",
      "done",
      "demoCreator 8",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 9",
      "demoDesc 9",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 9",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 10",
      "demoDesc 10",
      "Bug",
      "Medium",
      "Pending",
      "demoCreator 10",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
    [
      "demoName 11",
      "demoDesc 11",
      "Error",
      "High",
      "Pending",
      "demoCreator 11",
      <button className="btn waves-effect waves-light black yellow-text">
        click to modify
      </button>,
    ],
  ],
  comments: [
    ["Demo title 1", "Demo description 1", "Demo creator 1"],
    ["Demo title 2", "Demo description 2", "Demo creator 2"],
    ["Demo title 3", "Demo description 3", "Demo creator 3"],
    ["Demo title 4", "Demo description 4", "Demo creator 4"],
    ["Demo title 5", "Demo description 5", "Demo creator 5"],
    ["Demo title 6", "Demo description 6", "Demo creator 6"],
    ["Demo title 7", "Demo description 7", "Demo creator 7"],
    ["Demo title 8", "Demo description 8", "Demo creator 8"],
    ["Demo title 9", "Demo description 9", "Demo creator 9"],
    ["Demo title 10", "Demo description 10", "Demo creator 10"],
  ],
  users: [
    ["Demo user 1", "Demo Admin 1"],
    ["Demo user 2", "Demo Developer 2"],
    ["Demo user 3", "Demo Normal 3"],
    ["Demo user 4", "Demo Admin 4"],
    ["Demo user 5", "Demo Developer 5"],
    ["Demo user 6", "Demo Normal 6"],
    ["Demo user 7", "Demo Admin 7"],
  ],
});
