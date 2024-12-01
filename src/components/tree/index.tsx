import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import styles from "./Tree.module.scss";
import { CustomNode } from "./customNode";
import { useTreeContext } from "../../context/treeContext";

const OrgTree = () => {
  const treeContainerRef = useRef<Tree>(null);
  const { treeData, setTreeData } = useTreeContext();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensionsData, setDimensionsData] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 4 }); // Центрируем по горизонтали, сдвигаем немного вниз
      setDimensionsData({ width, height });
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.tree_wrapper}>
      <h1 className={styles.tree_wrapper__title}>Организационная структура</h1>
      {treeData ? (
        <Tree
          ref={treeContainerRef}
          data={treeData}
          orientation="vertical"
          pathFunc="step"
          translate={translate}
          dimensions={dimensionsData}
          separation={{ siblings: 2, nonSiblings: 2 }}
          renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
        />
      ) : (
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default OrgTree;
