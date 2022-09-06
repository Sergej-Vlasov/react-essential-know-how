import { useMemo, useState, useDeferredValue } from "react";

const UseDeferredValueExample = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ExpensiveComponent input={input} />
    </>
  );
};

export default UseDeferredValueExample;

const LIST_SIZE = 15000;

const ExpensiveComponent = ({ input }: { input: string }) => {
  const deferredInput = useDeferredValue(input);
  const list = useMemo(() => {
    const scopedList = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      scopedList.push(<div key={i}>{deferredInput}</div>);
    }
    return scopedList;
  }, [deferredInput]);

  return <>{list}</>;
};
