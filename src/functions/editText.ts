type TypeSetTextarea = (value: React.SetStateAction<string>) => void;
type TypeRefTextarea = React.MutableRefObject<HTMLTextAreaElement>;

export const editText = (type: string, textareaRef: TypeRefTextarea, setText: TypeSetTextarea) => {
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
