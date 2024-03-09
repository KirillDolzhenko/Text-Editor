import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import parse from "html-react-parser";

export function Preview() {
  const { text } = useContext(AppContext);

  return (
    <>
      <div className="preview">
        {text ? parse(text) : "Common... Just Input Something"}
      </div>
    </>
  );
}
