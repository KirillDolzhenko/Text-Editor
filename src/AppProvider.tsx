import { createContext, useState, Dispatch, SetStateAction } from "react";

export const AppContext = createContext<IContext>({
  text: "",
  setText: () => {},
  texts: [],
  setTexts: () => {},
});

export interface IElement {
  id: number;
  content: string;
}

interface Props {
  children?: React.ReactNode;
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
