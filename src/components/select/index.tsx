import { useState, useRef, useEffect, FC } from "react";
import styles from "./SelectInput.module.scss";
import arrow from "../../assets/arrow.svg";
import { FilterType } from "../filters";

interface SelectInputProps {
  options: FilterType[];
  selected: FilterType | null;
  setSelected: (value: FilterType) => void;
  placeholder?: string;
}

const SelectInput: FC<SelectInputProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обработчик выбора элемента
  const handleSelect = (option: FilterType) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.select_input} ref={dropdownRef}>
      <div
        className={styles.select_input__control}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? selected.label : "Выбрать..."}
        <span
          className={`${styles.select_input__arrow} ${isOpen && styles.open}`}
        >
          <img src={arrow} alt="" />
        </span>
      </div>

      {isOpen && (
        <div className={styles.select_input__menu}>
          <div className={styles.menu_wrapper}>
            {options.map((option) => (
              <div
                key={option.values}
                className={styles.select_input__option}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
