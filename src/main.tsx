import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TreeContextProvider } from "./context/treeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <TreeContextProvider>
    <App />
  </TreeContextProvider>
);
