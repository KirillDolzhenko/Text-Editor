import "./App.scss";
import { EditPanel } from "./components/EditPanel/EditPanel";
import { TextList } from "./components/TextList/TextList";
import { Preview } from "./components/Preview/Preview";

export function App() {
  return (
    <>
      <EditPanel></EditPanel>
      <Preview></Preview>
      <TextList></TextList>
    </>
  );
}
