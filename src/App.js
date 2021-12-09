import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";
import { Toast, Loader } from "./components";
import { AppProvider } from "./contexts/appContext";
function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <AppProvider>
          <Loader />
          <Toast />
          <AppRouter />
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
