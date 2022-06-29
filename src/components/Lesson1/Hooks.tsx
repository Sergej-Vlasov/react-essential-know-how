import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function Hooks() {
  console.log(`PropsAndState rerender`);
  const [counter, setCounter] = useState(0);
  const [otherCounter, setOtherCounter] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // handleIncrement function definition is no memoised and will not change on every rerender
  const handleIncrement = useCallback(() => setCounter((prev) => prev + 1), []);

  const handleOtherCounter = useCallback(
    () => setOtherCounter((prev) => prev - 1),
    []
  );

  // handleRefButton demonstrates how we can access other DOM elements using useRef
  //    here with using one button to programmatically click "Increment counter" button
  const handleRefButton = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  // nonMemoObject will reinitialise on state change
  const nonMemoObject = {};

  // memoObject will not reinitialise on state change and is stable
  const memoObject = useMemo(() => ({}), []);

  useEffect(() => {
    console.log("useEffect runs on every rerender");
  });

  useEffect(() => {
    console.log("useEffect runs only once");
  }, []);

  useEffect(() => {
    return () => {
      console.log("useEffect runs only when component unmounts");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect runs only when counter changes");
  }, [counter]);

  return (
    <>
      <button ref={buttonRef} onClick={handleIncrement}>
        Increment counter
      </button>

      <button onClick={handleOtherCounter}>Increment other counter</button>

      <button onClick={handleRefButton}> Ref to increment button</button>

      <div>counter is: {counter}</div>
      <div>other counter is: {otherCounter}</div>

      {/* will never rerender because component is memoised and prop is stable */}
      <SeparateIncrement handleIncrement={handleIncrement} />

      {/* will only rerender on props change because component is memoised  */}
      <SeparateCounterDisplay counter={counter} />

      {/* will never rerender because its memoised and has no props that change */}
      <JustChilling />

      {/* will rerender on every state change with nonMemoObject and will never rerender with memoObject */}
      <ComparingMemoedProp
        obj={nonMemoObject}
        // obj={memoObject}
      />
    </>
  );
}

export default Hooks;

// SeparateIncrement is now memoised component that will rerender only when props change
const SeparateIncrement = React.memo(function ({
  handleIncrement,
}: {
  handleIncrement: () => void;
}) {
  console.log(`SeparateIncrement rerender`);
  return <button onClick={handleIncrement}>Increment separate counter</button>;
});

const SeparateCounterDisplay = React.memo(function ({
  counter,
}: {
  counter: number;
}) {
  console.log(`SeparateCounter rerender`);

  return <div>separate counter is: {counter}</div>;
});

const JustChilling = React.memo(function () {
  console.log(`JustChilling rerender`);

  return <div>Just chilling</div>;
});

const ComparingMemoedProp = React.memo(function ({ obj }: { obj: object }) {
  console.log(`ComparingMemoedProp rerender`);

  return <div>test</div>;
});
