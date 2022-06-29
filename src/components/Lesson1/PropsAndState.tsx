import React, { useState } from "react";

function PropsAndState() {
  const [counter, setCounter] = useState(0);

  // handleIncrement will be re-initialised on every PropsAndState rerender
  const handleIncrement = () => setCounter((prev) => prev + 1);

  console.log(`PropsAndState rerender`);

  // in react the component rerenders when either props or state change
  //    in our scenario all logs should trigger on first visit and when incrementing count
  return (
    <>
      <button onClick={handleIncrement}>Increment counter</button>
      <div>count is: {counter}</div>

      {/* rerenders because state changes and handleIncrement changes reference  */}
      <SeparateIncrement handleIncrement={handleIncrement} />

      {/* rerenders because parents state changed but also rerenders because counter prop changed (batched together)  */}
      <SeparateCounterDisplay counter={counter} />

      {/* rerenders because parents state changed  */}
      <JustChilling />
    </>
  );
}

export default PropsAndState;

function SeparateIncrement({
  handleIncrement,
}: {
  handleIncrement: () => void;
}) {
  console.log(`SeparateIncrement rerender`);
  return <button onClick={handleIncrement}>Increment separate counter</button>;
}

function SeparateCounterDisplay({ counter }: { counter: number }) {
  console.log(`SeparateCounter rerender`);

  return <div>separate count is: {counter}</div>;
}

function JustChilling() {
  console.log(`JustChilling rerender`);

  return <div>Just chilling</div>;
}
