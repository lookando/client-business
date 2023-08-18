import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import styles from './index.less';

interface PropsType {
    setComponentIndex: any,
    selectedKeys?: any,
    treeData: DataNode[],
    getTypeAndStage?: any,
}
const TreeComponent: React.FC<PropsType> = (props: any) => {
    const [selectedKeys, setSelectedKeys]: any = useState(['0']);
    const [expandedKeys, setExpandedKeys]: any = useState(['1', '2']);
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        // if (info?.node?.title == '建设计划' || info?.node?.title == '项目立项和启动') {
        // } else {
        // };
        setSelectedKeys(keys);
        props.setComponentIndex(info?.node?.title);
        props.getTypeAndStage(keys);
    };
    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        setExpandedKeys(keys);
    };
    useEffect(() => {
        setSelectedKeys(props.selectedKeys);
    }, [props.selectedKeys])
    return (
        <div className={styles.leftItem}>
            <Tree
                showLine
                defaultExpandAll
                onSelect={onSelect}
                treeData={props.treeData}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                className={styles.leftTree}
                selectedKeys={selectedKeys}
            />
        </div>
    )
};

export default TreeComponent;
