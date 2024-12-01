import axios from "axios";
import { buildHierarchyFromNestedArrays } from "../utils/buildHierarchy";

type getUpdateTreeProps = {
  id: number;
  full_names: string;
  number: string;
  address: string;
  city: string;
  job_name: string;
  role_id: string;
  parent_id: number;
  department_id: string;
  block_id: string;
  subdivision_id: string;
};

export const treeServices = {
  async getTree() {
    const { data } = await axios.get(
      "https://employeesmts-production.up.railway.app/api/employer"
    );

    console.log(buildHierarchyFromNestedArrays(data));

    return data;
  },

  async getUpdateTree(values: getUpdateTreeProps) {
    const { data } = await axios.post(
      "https://employeesmts-production.up.railway.app/api/employers",
      values
    );

    return data;
  },
};

export const treeFiltersServices = {
  async getFiltersData() {
    const { data } = await axios.get(
      "https://employeesmts-production.up.railway.app/api/filters"
    );

    return data;
  },
};
