import { FC } from "react";
import styles from "./filters.module.scss";
import { ErrorMessage, Field } from "formik";

interface FilterProps {
  title: string;
  placeholder?: string;
  type?: string;
  name: string;
  otherClassName?: string;
}

const Filter: FC<FilterProps> = ({
  title,
  placeholder = "",
  type = "text",
  name,
  otherClassName,
}) => {
  return (
    <div className={`${styles.filter} ${otherClassName}`}>
      <h3>{title}</h3>
      <Field
        name={name}
        className={styles.filter_input}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

export default Filter;
