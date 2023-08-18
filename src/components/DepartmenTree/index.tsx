import { Tree } from "antd";
import { DataNode } from "antd/lib/tree";

const treeData: DataNode[] = [
  {
    title: '华西证券(总部)',
    key: '0-0',
    children: [
      {
        title: '华西金智',
        key: '0-0-1',
      },
      {
        title: '华西期货',
        key: '0-0-2',
        children: [{
          title: '华西金智',
          key: '0-0-0-0',
        }],
      },
    ],
  },
];

const DepartmentTree: React.FC = () => {
  return  <>
      <Tree
        style={{ margin: '10px' }}
        defaultExpandAll
        treeData={treeData}
      /></>;
};
export default DepartmentTree;