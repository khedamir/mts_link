import SelectInput from "../select";
import styles from "./filters.module.scss";
import Filter from "./filter";
import { Form, Formik } from "formik";
import { treeFiltersServices, treeServices } from "../../services/tree.service";
import { useEffect, useState } from "react";
import burgerIcon from "../../assets/burger-icon.svg";
import { useTreeContext } from "../../context/treeContext";
import { buildHierarchy } from "../../utils/buildHierarchy";
import MtsLogo from "../../assets/mts_logo.png";

type FormValuesType = {
  full_names: string;
  city: string;
};

type FiltersType = FormValuesType & {
  id: number;
  number: string;
  address: string;
  job_name: string;
  role_id: string;
  parent_id: number;
  department_id: string;
  block_id: string;
  subdivision_id: string;
};

export type FilterType = {
  values: number;
  label: string;
};

interface FiltersDataType {
  blocks: FilterType[];
  departments: FilterType[];
  jobs: FilterType[];
  offices: FilterType[];
  roles: FilterType[];
  subdivisions: FilterType[];
}

const Filters = () => {
  const [closed, setClosed] = useState(false);
  const [filtersData, setFiltersData] = useState<FiltersDataType | null>(null);

  const [block, setBlock] = useState<FilterType | null>(null);
  const [department, setDepartment] = useState<FilterType | null>(null);
  const [job, setJob] = useState<FilterType | null>(null);
  const [office, setOffice] = useState<FilterType | null>(null);
  const [role, setRole] = useState<FilterType | null>(null);
  const [subdivision, setSubdivision] = useState<FilterType | null>(null);

  const { setTreeData } = useTreeContext();

  const initialState: FormValuesType = {
    full_names: "",
    city: "",
  };

  useEffect(() => {
    treeFiltersServices.getFiltersData().then(setFiltersData);
  }, []);

  const handleSubmit = (values: FormValuesType) => {
    const FiltersData: FiltersType = {
      id: 0,
      number: "",
      address: "",
      parent_id: 0,
      full_names: values.full_names,
      city: values.city,
      job_name: job ? String(job.values) : "",
      role_id: role ? String(role.values) : "",
      department_id: department ? String(department.values) : "",
      block_id: block ? String(block.values) : "",
      subdivision_id: subdivision ? String(subdivision.values) : "",
    };

    // setClosed(true);

    treeServices.getUpdateTree(FiltersData).then((result) => {
      setTreeData(buildHierarchy(result.data));
    });
  };

  return (
    <div className={`${styles.filters} ${closed && styles.closed}`}>
      <header className={styles.filters_header}>
        <div className={styles.filters_header_wrap}>
          <img src={MtsLogo} alt="" />
          <h2 className={styles.title}>Link</h2>
        </div>

        <img onClick={() => setClosed(!closed)} src={burgerIcon} alt="" />
      </header>
      {filtersData && (
        <Formik
          className={styles.filters_form}
          initialValues={initialState}
          onSubmit={handleSubmit}
        >
          <Form className={styles.filter_list}>
            <Filter
              title="ФИО сотрудника"
              placeholder="ФИО"
              name="name"
              otherClassName={styles.filter_wrapper}
            />

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Офис</h3>
              <SelectInput
                options={filtersData.offices}
                selected={office}
                setSelected={setOffice}
              />
            </div>

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Блок</h3>
              <SelectInput
                options={filtersData.blocks}
                selected={block}
                setSelected={setBlock}
              />
            </div>

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Подразделение</h3>
              <SelectInput
                options={filtersData.subdivisions}
                selected={subdivision}
                setSelected={setSubdivision}
              />
            </div>

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Отдел</h3>
              <SelectInput
                options={filtersData.departments}
                selected={department}
                setSelected={setDepartment}
              />
            </div>

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Должность</h3>
              <SelectInput
                options={filtersData.jobs}
                selected={job}
                setSelected={setJob}
              />
            </div>

            <div className={`${styles.filter} ${styles.filter_wrapper}`}>
              <h3>Роль</h3>
              <SelectInput
                options={filtersData.roles}
                selected={role}
                setSelected={setRole}
              />
            </div>

            <Filter
              title="Город"
              placeholder="Город"
              name="city"
              otherClassName={styles.filter_wrapper}
            />
            <footer className={styles.filters_footer}>
              <button type="submit" className={styles.filters_button}>
                Найти
              </button>
            </footer>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Filters;
