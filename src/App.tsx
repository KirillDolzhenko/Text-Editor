import "./App.scss";
import { EditPanel } from "./components/EditPanel/EditPanel";
import { TextListMemo } from "./components/TextList/TextList";
import { Preview } from "./components/Preview/Preview";

export function App() {
  return (
    <div className="container">
      <EditPanel></EditPanel>
      <Preview></Preview>
      <TextListMemo></TextListMemo>
    </div>
  );
}
