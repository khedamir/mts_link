import { useEffect, useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import styles from "./Tree.module.scss";
import { useTreeContext } from "../../context/treeContext";

// Кастомный компонент для узла
export const CustomNode = ({
  nodeDatum,
  toggleNode,
  hierarchyPointNode,
}: CustomNodeElementProps) => {
  const [searchedNode, setSearchedNode] = useState(false);
  const { modalActive, setModalActive, setModalData } = useTreeContext();

  useEffect(() => {
    if (nodeDatum.name === "Ольга Орлова") {
      toggleNode();
      setSearchedNode(true);
    }
  }, []);

  const toggleModal = () => {
    setModalActive(!modalActive);
    setModalData(nodeDatum);
  };

  return (
    <g
      className={`${styles.treeNode} ${searchedNode && styles.searchedNode} ${
        nodeDatum.children?.length && styles.children
      }`}
    >
      {/* Прямоугольник */}
      <rect
        width="200"
        height="60"
        x="-100"
        y="-30"
        rx="6"
        ry="6"
        onClick={toggleNode} // Добавляем возможность раскрытия/сворачивания узла
        style={{ cursor: "pointer" }}
      />
      {/* Имя узла */}
      <text
        fontSize="16"
        stroke="none"
        textAnchor="middle"
        alignmentBaseline="middle"
        dy={-10}
        onClick={toggleModal}
      >
        {nodeDatum.full_name}
      </text>
      <text
        fontSize="14"
        stroke="none"
        textAnchor="middle"
        alignmentBaseline="middle"
        className={styles.position}
        dy={10}
      >
        {nodeDatum.job_name}
      </text>
    </g>
  );
};
