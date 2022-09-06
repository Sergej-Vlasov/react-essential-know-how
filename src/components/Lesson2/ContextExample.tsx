import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

// this is a helper function which makes context always defined
// so that typescript does not complain about it
export function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    // remove the line below if you want to allow undefined
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

type ThemeTypes = "dark" | "light";

type ThemeContextValue = [
  ThemeTypes,
  React.Dispatch<React.SetStateAction<ThemeTypes>>
];

const [ThemeContext, ThemeContextProvider] = createCtx<ThemeContextValue>();

export const useTheme = () => ThemeContext();

const ThemeProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeTypes>("dark");
  return (
    <ThemeContextProvider value={[theme, setTheme]}>
      {children}
    </ThemeContextProvider>
  );
};

const GrandParent = ({ children }: { children: ReactElement }) => children;
const Parent = ({ children }: { children: ReactElement }) => children;
const Child = () => {
  const [theme, setTheme] = useTheme();

  return (
    <>
      <p>Current theme is: {theme}</p>
      <button
        onClick={() =>
          setTheme((theme) => (theme === "dark" ? "light" : "dark"))
        }
      >
        Change to {theme === "dark" ? "light" : "dark"} theme
      </button>
    </>
  );
};

const ContextExample = () => (
  <ThemeProvider>
    <GrandParent>
      <Parent>
        <Child />
      </Parent>
    </GrandParent>
  </ThemeProvider>
);

export default ContextExample;
