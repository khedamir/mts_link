import axios from "axios";

type getUpdateTreePropss = {
  id: number;
  full_name: string;
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

type getUpdateTreeProps = {
  full_name: string;
  city: string;
  job_name: string;
  role_id: string;
  parent_id: number;
  department_id: string;
  block_id: string;
  subdivision_id: string;
};

export const treeServices = {
  async getTree() {},

  async getUpdateTree(values: getUpdateTreeProps) {
    const { data } = await axios.post(
      "https://employeesmts-production.up.railway.app/api/employers",
      { id: 0, number: "", address: "", ...values }
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
