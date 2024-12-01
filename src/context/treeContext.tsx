import { createContext, useContext, useEffect, useState } from "react";
import { treeServices } from "../services/tree.service";

type NodeType = {
  id: number;
  full_name: string;
  number: string;
  address: string;
  city: string;
  job_name: string;
  role_name: string;
  parent_id: number;
  department_name: string;
  block_name: string;
  subdivision_name: string;
  office_name: string;
  children: NodeType;
};

type treeDataType = NodeType[];

interface ITreeContext {
  treeData: treeDataType | null;
  setTreeData: (_v: any) => void;
  modalActive: boolean;
  setModalActive: (_v: boolean) => void;
  modalData: NodeType | null;
  setModalData: (_v: any) => void;
}

const initialData: ITreeContext = {
  treeData: null,
  setTreeData: (_v: any) => {},
  modalActive: false,
  setModalActive: (_v: boolean) => {},
  modalData: null,
  setModalData: (_v: any) => {},
};

const TreeContext = createContext(initialData);

const TreeContextProvider = (props: any) => {
  const [treeData, setTreeData] = useState<treeDataType | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState<NodeType | null>(null);

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
        // setTreeData(buildHierarchy(result.data));
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
