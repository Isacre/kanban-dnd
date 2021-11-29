import "./App.css";
import Kanban from "./Components/Kanban";
import { Provider } from "react-redux";
import { store } from "./Store";
import lampada from "../src/assets/lampada.svg";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Kanban />
        <img src={lampada} alt="backgroundimage" className="lampada" />
      </Provider>
    </div>
  );
}

export default App;
