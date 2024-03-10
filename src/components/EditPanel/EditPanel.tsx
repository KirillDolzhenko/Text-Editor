import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../AppProvider";
import "./../../App.scss";
import { APIText } from "../../api/api";

export function EditPanel(): JSX.Element {
  const { text, texts, setText, setTexts } = useContext(AppContext);
  const [keys, setKeys] = useState<string[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  console.log(keys, lastKey);

  const arrayOfEdit: string[] = ["u", "i", "b", "alt"];

  const sendText = async () => {
    let id = texts?.length
      ? String(Number(texts[texts?.length - 1].id) + 1)
      : "1";

    await APIText.putText(textareaRef.current.value, id);

    setText("");

    const response = await APIText.getTexts();

    setTexts(response.data);
  };

  const editText = (type: string) => {
    function dec(type: string, text: string) {
      return `<${type}>${text}</${type}>`;
    }

    let left = textareaRef.current.value.slice(
      0,
      textareaRef.current.selectionStart
    );
    let middle = dec(
      type,
      textareaRef.current.value.slice(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd
      )
    );
    let right = textareaRef.current.value.slice(
      textareaRef.current.selectionEnd
    );

    setText(left + middle + right);
  };

  useEffect(() => {
    if (!lastKey) return;

    if (arrayOfEdit.includes(lastKey?.toLowerCase())) {
      console.log(1);
      for (let i: number = 0; i < arrayOfEdit.length - 1; i++) {
        console.log(keys, arrayOfEdit[i]);
        if (checkingCombinations(keys, "alt", arrayOfEdit[i])) {
          console.log(3, i);
          editText(arrayOfEdit[i]);
          break;
        }
      }
    }
  }, [lastKey]);

  function checkingCombinations(
    keys: string[],
    key1: string,
    key2: string
  ): Boolean {
    console.log(
      keys.includes(key1.toLowerCase()) && keys.includes(key2.toLowerCase())
    );
    return (
      keys.includes(key1.toLowerCase()) && keys.includes(key2.toLowerCase())
    );
  }

  const listenKeys = (e: KeyboardEvent): void => {
    if (e.repeat) return;

    if (!keys.includes(e.key.toLowerCase())) {
      setKeys([...keys, e.key.toLowerCase()]);
      setLastKey(e.key.toLowerCase());
    }
  };

  const removeKeys = (e: KeyboardEvent): void => {
    setLastKey(null);
    setKeys([...keys.filter((el) => el.toLowerCase() != e.key.toLowerCase())]);
  };

  useEffect(() => {
    document.addEventListener("keydown", listenKeys);
    document.addEventListener("keyup", removeKeys);

    return () => {
      document.removeEventListener("keydown", listenKeys);
      document.removeEventListener("keyup", removeKeys);
    };
  }, [keys]);

  useLayoutEffect(() => {
    document.removeEventListener("keydown", removeKeys);
    document.removeEventListener("keyup", removeKeys);
  }, []);

  const changeInputText = () => {
    setText(textareaRef.current.value);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  return (
    <>
      <div>
        <h1>OtherEditor</h1>
        <div className="editPanel">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={changeInputText}
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
                      editText("u");
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
                      editText("b");
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
                      editText("i");
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
                  sendText();
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
