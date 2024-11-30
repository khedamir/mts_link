import { createContext, useContext, useEffect, useState } from "react";
import { treeServices } from "../services/tree.service";
import { buildHierarchy } from "../components/utils/buildHierarchy";

const TreeContext = createContext({
  treeData: null,
  setTreeData: (v: any) => {},
  modalActive: false,
  setModalActive: (v: boolean) => {},
  modalData: {},
  setModalData: (v: any) => {},
});

const TreeContextProvider = (props: any) => {
  const [treeData, setTreeData] = useState<any | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState();

  useEffect(() => {
    treeServices
      .getUpdateTree({
        full_name: "Алекс",
        city: "",
        job_name: "0",
        role_id: "0",
        parent_id: 0,
        department_id: "0",
        block_id: "0",
        subdivision_id: "0",
      })
      .then((result) => {
        console.log(result);
        setTreeData(buildHierarchy(result.data));
      });
  }, []);

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        modalActive,
        setModalActive,
        modalData,
        setModalData,
      }}
      {...props}
    ></TreeContext.Provider>
  );
};

const useTreeContext = () => useContext(TreeContext);
export { TreeContextProvider, useTreeContext };
