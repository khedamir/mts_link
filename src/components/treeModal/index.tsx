import { useTreeContext } from "../../context/treeContext";
import styles from "./treeModal.module.scss";
import closeIcon from "../../assets/close-icon.svg";

const TreeModal = () => {
  const { modalActive, setModalActive, modalData } = useTreeContext();

  if (!modalData) {
    return;
  }

  return (
    <div
      onClick={() => setModalActive(false)}
      className={`${styles.modal} ${styles.tree_modal} ${
        modalActive && styles.active
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal_wrap}>
        <header className={styles.modal_header}>
          <h3>Сотрудник</h3>
          <span
            className={styles.close_icon}
            onClick={() => setModalActive(false)}
          >
            <img src={closeIcon} alt="" />
          </span>
        </header>
        <div className={styles.modal_content}>
          <div>
            <p>{modalData.full_name}</p>
            <p>{modalData.number}</p>
            <p>{modalData.address}</p>
            <p>{modalData.city}</p>
          </div>

          <p>Офис: {modalData.office_name}</p>
          <p>Блок: {modalData.block_name}</p>
          <p>Подразделение: {modalData.subdivision_name}</p>
          <p>Отдел: {modalData.department_name}</p>
          <p>Должность: {modalData.job_name}</p>
          <p>Роль: {modalData.role_name}</p>
        </div>
      </div>
    </div>
  );
};

export default TreeModal;
