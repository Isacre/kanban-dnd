import "./App.css";
import Kanban from "./Components/Kanban";
import { Provider } from "react-redux";
import { store } from "./Store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Kanban />
      </Provider>
    </div>
  );
}

export default App;
