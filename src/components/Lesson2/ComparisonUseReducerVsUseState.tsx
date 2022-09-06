import { FC, memo, useEffect, useReducer, useState } from "react";

enum CounterActionType {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  TEXT = "TEXT",
}

interface CounterNumberAction {
  type: CounterActionType.INCREMENT | CounterActionType.DECREMENT;
  payload?: number;
}

interface CounterTextAction {
  type: CounterActionType.TEXT;
  payload?: string;
}

type CounterActions = CounterNumberAction | CounterTextAction;

interface CounterState {
  counter: number;
  text: string;
}

const counterReducer = (state: CounterState, action: CounterActions) => {
  const { type, payload } = action;
  switch (type) {
    case CounterActionType.INCREMENT:
      return {
        ...state,
        counter: state.counter + (payload || 1),
      };
    case CounterActionType.DECREMENT:
      return {
        ...state,
        counter: state.counter - (payload || 1),
      };
    case CounterActionType.TEXT:
      return {
        ...state,
        text: payload || "",
      };
    default:
      return state;
  }
};

// here we will look at useReducer vs useState
// useReducer is a hook that allows us to manage state in a more complex way
//   it is a more flexible alternative to useState
// Here is an in-depth overview of when to choose each https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer

const ComparisonUseReducerVsUseState = () => {
  const [counter, setCounter] = useState(0);
  const [counterState, dispatch] = useReducer(counterReducer, {
    counter: 0,
    text: "",
  });

  return (
    <>
      <div>useState counter: {counter}</div>
      <div>useReducer counter: {counterState.counter}</div>
      <div>useReducer text: {counterState.text}</div>
      <CompWithUseState setCounter={setCounter} />
      <CompWithUseReducer dispatch={dispatch} />
    </>
  );
};

export default ComparisonUseReducerVsUseState;

interface ICompWithUseStateProps {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}
const CompWithUseState: FC<ICompWithUseStateProps> = memo(({ setCounter }) => {
  useEffect(() => {
    console.log("setCounter changed");
  }, [setCounter]);

  return (
    <div>
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Increment useState counter
      </button>
      <button onClick={() => setCounter((prev) => prev - 1)}>
        Decrement useState counter
      </button>
    </div>
  );
});

interface ICompWithUseReducerProps {
  dispatch: React.Dispatch<CounterActions>;
}
const CompWithUseReducer: FC<ICompWithUseReducerProps> = memo(
  ({ dispatch }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log("dispatch changed");
    }, [dispatch]);
    return (
      <>
        <div>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
          <button
            onClick={() =>
              dispatch({ type: CounterActionType.INCREMENT, payload: count })
            }
          >
            Increment useReducer counter
          </button>
          <button
            onClick={() =>
              dispatch({ type: CounterActionType.DECREMENT, payload: count })
            }
          >
            Decrement useReducer counter
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: CounterActionType.TEXT,
                payload: e.target.value,
              })
            }
          />
        </div>
      </>
    );
  }
);
