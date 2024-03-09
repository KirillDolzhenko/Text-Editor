import { createContext, useState, Dispatch, SetStateAction } from "react";

export const AppContext = createContext<IContext>({
  text: "",
  setText: () => {},
  texts: [],
  setTexts: () => {},
});

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

export interface IElement {
  id: number;
  content: string;
}

interface IContext {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  texts: IElement[];
  setTexts: Dispatch<SetStateAction<IElement[]>>;
}

export function AppProvider({ children }: Props): React.ReactNode {
  const [text, setText] = useState<string>("Hello world!");
  const [texts, setTexts] = useState<Array<IElement>>([]);

  return (
    <AppContext.Provider
      value={{
        text,
        setText,
        texts,
        setTexts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
