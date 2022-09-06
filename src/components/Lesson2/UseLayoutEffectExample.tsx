import React, { useLayoutEffect, useRef, useState } from "react";

const UseLayoutEffectExample = () => {
  const [show, setShow] = useState(false);
  const popUpRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // useLayoutEffect occurs in a synchronous manner
  //   between when react calculates the DOM and when the browser paints the DOM

  // useEffect occurs in asynchronous manner when the browser paints the DOM
  useLayoutEffect(() => {
    if (!popUpRef.current || !buttonRef.current) return;
    // unfortunately CRA with react 18 does not demonstrate the difference between useLayoutEffect and useEffect
    //  in the past the pop up would appear below the button and jump to the requested position in useEffect
    const { bottom } = buttonRef.current.getBoundingClientRect();
    popUpRef.current.style.top = `${bottom + 4 * 16}px`;
  }, [show]);

  return (
    <div>
      <button onClick={() => setShow((show) => !show)} ref={buttonRef}>
        Toggle PopUp
      </button>
      {show && (
        <div ref={popUpRef} style={{ position: "absolute" }}>
          Pop Up!
        </div>
      )}
    </div>
  );
};

export default UseLayoutEffectExample;
