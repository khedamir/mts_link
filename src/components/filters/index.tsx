import SelectInput from "../select";
import styles from "./filters.module.scss";
import Filter from "./filter";
import { Form, Formik } from "formik";
import { treeFiltersServices, treeServices } from "../../services/tree.service";
import { useEffect, useState } from "react";
import burgerIcon from "../../assets/burger-icon.svg";

type FormValuesType = {
  full_name: string;
  city: string;
};

type FiltersType = FormValuesType & {
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

  const initialState: FormValuesType = {
    full_name: "",
    city: "",
  };

  useEffect(() => {
    treeFiltersServices.getFiltersData().then(setFiltersData);
  }, []);

  const handleSubmit = (values: FormValuesType) => {
    const FiltersData: FiltersType = {
      full_name: values.full_name,
      city: values.city,
      job_name: job ? String(job.values) : "_",
      role_id: role ? String(role.values) : "_",
      parent_id: 0,
      department_id: department ? String(department.values) : "_",
      block_id: block ? String(block.values) : "_",
      subdivision_id: subdivision ? String(subdivision.values) : "_",
    };

    console.log(FiltersData);
    setClosed(true);

    // treeServices.getUpdateTree(FiltersData);
  };

  return (
    <div className={`${styles.filters} ${closed && styles.closed}`}>
      <header className={styles.filters_header}>
        <h2 className={styles.title}>Характеристики</h2>

        <img onClick={() => setClosed(!closed)} src={burgerIcon} alt="" />
        {/* <p onClick={() => setClosed(!closed)}>b</p> */}
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
