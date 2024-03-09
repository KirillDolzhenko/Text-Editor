import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppProvider";
import "./../../App.scss";
import { APIText } from "../../api/api";

export function EditPanel(): JSX.Element {
  const { text, texts, setText, setTexts } = useContext(AppContext);

  const sendText = async () => {
    let id = texts?.length
      ? String(Number(texts[texts?.length - 1].id) + 1)
      : "1";

    await APIText.putText(textareaRef.current.value, id);

    setText("");

    const response = await APIText.getTexts();

    setTexts(response.data);
  };

  const editText = (type: "u" | "b" | "i") => {
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

    console.log(left);
    console.log(middle);
    console.log(right);

    setText(left + middle + right);
  };

  const changeInputText = () => {
    setText(textareaRef.current.value);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  return (
    <>
      <div>
        <h1>Enter Text</h1>
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
