import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { Checkbox, Label, Input } from "@rebass/forms";
import "./styles.css";

const toggleMachine = Machine({
  id: "toggleMachine",
  initial: "active",
  context: {
    email: ""
  },
  states: {
    active: {
      on: {
        TOGGLE: "inactive"
      }
    },
    inactive: {
      on: {
        TOGGLE: "active"
      }
    }
  },
  on: {
    INPUT: {
      actions: assign({ email: (_ctx, e) => e.value })
    }
  }
});

export default function App() {
  const [current, send] = useMachine(toggleMachine);
  console.log(current.value);
  console.log(current.context);
  return (
    <div className="App">
      <div>
        <Label htmlFor="email"> Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={current.context.email}
          onChange={e =>
            send({
              type: "INPUT",
              value: e.target.value
            })
          }
        />
      </div>
      <Label>
        <Checkbox
          id="toggle"
          name="toggle"
          checked={current.matches("active")}
          onChange={() => send("TOGGLE")}
          // onClick={() => send("TOGGLE")}
        />{" "}
        Toggle Me
      </Label>
    </div>
  );
}
