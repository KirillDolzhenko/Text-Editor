import { useContext, useEffect } from "react";
import "./../../App.scss";
import styles from "./TextList.module.scss";
import { AppContext } from "../../AppProvider";
import { APIText } from "../../api/api";
import { IElement } from "../../AppProvider";
import parse from "html-react-parser";
// interface IElement {
//   id: number,
//   text: string
// }

export function TextList() {
  const { texts, setTexts } = useContext(AppContext);

  useEffect(() => {
    APIText.getTexts().then((response) => {
      setTexts(response.data);
    });
  }, []);

  const deleteText = async (id: number) => {
    await APIText.deleteText(id);

    let response = await APIText.getTexts();
    let data: IElement[] = response.data;
    setTexts(data);
  };

  const textsElements = texts.map((el) => {
    return (
      <li className="listElement" key={el.id}>
        {parse(el.content)}
        <button
          className="delete"
          onClick={() => {
            deleteText(el.id);
            console.log(parse(el.content));
          }}
        >
          x
        </button>
      </li>
    );
  });

  console.log(22222, textsElements);

  return (
    <>
      <div>
        <h2>Previous Texts</h2>
        <ul className={styles.prevTexts}>
          {textsElements.length ? textsElements : "There is no messages"}
        </ul>
      </div>
    </>
  );
}
