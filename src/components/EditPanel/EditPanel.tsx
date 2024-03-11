import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../AppProvider";
import "./../../App.scss";
import { editText } from "../../functions/editText";
import { useEffectLastKey } from "../../functions/useEffectLastKey";
import {
  checkingCombinations,
  listenKeys,
  removeKeys,
} from "../../functions/checking";
import { sendText } from "../../functions/sendText";

export function EditPanel(): JSX.Element {
  const { text, texts, setText, setTexts } = useContext(AppContext);
  const [keys, setKeys] = useState<string[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const arrayOfEdit: string[] = ["u", "i", "b", "alt"];

  const editTextEditPanel = (type: string) =>
    editText(type, textareaRef, setText);
  const listenKeysEditPanel = (e: KeyboardEvent) =>
    listenKeys(e, keys, setKeys, setLastKey);
  const removeKeysEditPanel = (e: KeyboardEvent) =>
    removeKeys(e, keys, setKeys, setLastKey);

  useEffectLastKey(
    arrayOfEdit,
    lastKey,
    keys,
    editTextEditPanel,
    checkingCombinations
  );

  useEffect(() => {
    document.addEventListener("keydown", listenKeysEditPanel);
    document.addEventListener("keyup", removeKeysEditPanel);

    return () => {
      document.removeEventListener("keydown", listenKeysEditPanel);
      document.removeEventListener("keyup", removeKeysEditPanel);
    };
  }, [keys]);

  useLayoutEffect(() => {
    document.removeEventListener("keydown", listenKeysEditPanel);
    document.removeEventListener("keyup", removeKeysEditPanel);
  }, []);

  return (
    <>
      <div>
        <h1>OtherEditor</h1>
        <div className="editPanel">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={() => setText(textareaRef.current.value)}
            className="inputBlock"
            spellCheck="false"
          ></textarea>
          <div className="buttonsBlock">
            <div className="editBlock">
              <ul className="editBlockList">
                <li>
                  <button
                    onClick={() => {
                      setText("");
                    }}
                  >
                    <svg>
                      <use href="public/erase.svg#icon"></use>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      editTextEditPanel("u");
                    }}
                  >
                    <svg className="stroke">
                      <use href="public/underline.svg#icon"></use>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      editTextEditPanel("b");
                    }}
                  >
                    <svg>
                      <use href="public/bold.svg#icon"></use>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      editTextEditPanel("i");
                    }}
                  >
                    <svg className="stroke">
                      <use href="public/italic.svg#icon"></use>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div className="sendBlock">
              <button
                className="btn"
                onClick={() => {
                  sendText(texts, textareaRef, setText, setTexts);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
