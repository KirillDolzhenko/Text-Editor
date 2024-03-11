import { IElement } from './../AppProvider';
import { APIText } from "../api/api";

type TypeRefTextarea = React.MutableRefObject<HTMLTextAreaElement>;
type TypeSetTextara = (value: React.SetStateAction<string>) => void;
type TypeSetTexts = React.Dispatch<React.SetStateAction<IElement[]>>

// export const editText = (type: string, textareaRef: TypeRefTextarea,

export const sendText = async (texts: IElement[], textareaRef: TypeRefTextarea, setText: TypeSetTextara, setTexts: TypeSetTexts) => {
    let id = texts?.length
      ? String(Number(texts[texts?.length - 1].id) + 1)
      : "1";

    await APIText.putText(textareaRef.current.value, id);

    setText("");

    const response = await APIText.getTexts();

    setTexts(response.data);
};