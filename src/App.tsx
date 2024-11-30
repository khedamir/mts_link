import Filters from "./components/filters";
import OrgTree from "./components/tree";
import TreeModal from "./components/treeModal";

function App() {
  return (
    <div className="main">
      <Filters />
      <OrgTree />
      <TreeModal />
    </div>
  );
}

export default App;
