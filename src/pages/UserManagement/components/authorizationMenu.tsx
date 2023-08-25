/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import styles from '../less/roleAuthorlzation.less';
import _ from 'lodash';
interface PropsType {
    show: boolean;
    treeData: any;
    selectData: any;
    setMenuRequest: any;
}

const AuthorizationMenu: React.FC<PropsType> = (props: any) => {
    const [treeData, setTreeData] = useState([]);
    const [selectIdData, setSelectIdData] = useState<any>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    // const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    //递归获得树的数据
    const treeDataRecursion = (list: any) => {
        return list.map((item: any) => {
            if (item.children?.length) {
                return {
                    key: item.id,
                    id: item.id,
                    title: item.name,
                    children: treeDataRecursion(item.children)
                }
            }
            return {
                key: item.id,
                id: item.id,
                title: item.name,
            };
        });
    }
    useEffect(() => {
        if (props.show) {
            const data = JSON.parse(JSON.stringify(props.treeData));
            setTreeData(treeDataRecursion(data));
        }
        setSelectIdData([]);
    }, [props.show]);

    //控制树
    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    //点击节点
    const onCheck = (checkedKeysValue: React.Key[], e: any) => {
        setCheckedKeys(checkedKeysValue);
        setSelectIdData([...checkedKeysValue, ...e?.halfCheckedKeys]);
    };

    //获取展开数据的id
    const checkKeys: any = [];
    const expandKeys: any = [];
    const selectDataRecursion = (list: any) => {
        list.map((item: any) => {
            if (item.children.length > 0) {
                expandKeys.push(item.id);
                selectDataRecursion(item.children);
            } else {
                checkKeys.push(item.id);
            }
        });
    }
    useEffect(() => {
        //选中的树节点
        const selData = JSON.parse(JSON.stringify(props.selectData));
        selectDataRecursion(selData);
        setCheckedKeys(checkKeys);
        setExpandedKeys(expandKeys);
    }, [props.selectData]);

    useEffect(() => {
        if (selectIdData.length == 0) {
            props.setMenuRequest([...expandedKeys, ...checkedKeys]);
        } else {
            props.setMenuRequest(selectIdData);
        }
    }, [selectIdData])


    return (
        <div>
            <div
                className={styles.authorlzation}
            >
                <Tree
                    checkable
                    showLine
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    // selectedKeys={selectedKeys}
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                />
            </div>
        </div>
    );
};

export default AuthorizationMenu;
