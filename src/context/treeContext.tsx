import { createContext, useContext, useEffect, useState } from "react";
import { treeServices } from "../services/tree.service";
import { buildHierarchy } from "../utils/buildHierarchy";

const data: NodeType[] = [
  {
    id: 1,
    full_name: "Смирнов Александр",
    number: "89789558544",
    address: "проспект Мира, 14, 3 этаж, офис 301",
    city: "Москва",
    job_name: "Председатель банка",
    role_name: "руководство",
    parent_id: 0,
    department_name: "Дополнительный офис 2",
    block_name: "Корпоративный блок",
    subdivision_name: "-",
    office_name: "",
    children: null,
  },
  {
    id: 3,
    full_name: "Ильина Александра",
    number: "79014813949",
    address: "проспект Мира, 14, 3 этаж, офис 303",
    city: "Москва",
    job_name: "Заместитель председателя банка",
    role_name: "руководство",
    parent_id: 1,
    department_name: "-",
    block_name: "Розничный блок",
    subdivision_name: "-",
    office_name: "",
    children: null,
  },
  {
    id: 4,
    full_name: "Комаров Александр",
    number: "79667036549",
    address: "проспект Мира, 14, 2 этаж, место 24",
    city: "Москва",
    job_name: "Директор управления",
    role_name: "руководство",
    parent_id: 3,
    department_name: "-",
    block_name: "Корпоративный блок",
    subdivision_name: "Управление по работе с филиалами",
    office_name: "",
    children: null,
  },
];

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
  children: NodeType[] | null;
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
        id: 0,
        full_names: "Алекс",
        number: "",
        address: "",
        city: "",
        job_name: "",
        role_id: "1",
        parent_id: 1,
        department_id: "",
        block_id: "",
        subdivision_id: "",
      })
      .then((result) => {
        console.log(result);
        setTreeData(buildHierarchy(result.data));
      })
      .catch(() => {
        setTreeData(buildHierarchy(data));
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
