/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import styles from '../less/roleAuthorlzation.less';
import _ from 'lodash';
interface PropsType {
    selectDataVal: any;
    dataList: any;
    setDataRequest: any;
    isDone: any;
    selectVal: any;
    setSelectVal: any;
}

const AuthorIzation: React.FC<PropsType> = (props: any) => {
    const [treeData, setTreeData] = useState([]);
    useEffect(() => {
        if (props.dataList) {
            let list: any = [];
            props.dataList.map((item: any) => {
                let obj: any = {};
                obj.title = item.name;
                obj.id = item.id;
                obj.key = item.id;
                list.push(obj);
            });
            setTreeData(list);
        };
    }, [props.dataList]);
    //单选
    const onCheck = (key: any, e: any) => {
        if (key.length > 1) {
            key.shift();
            e.checkedNodes.shift();
            e.checkedNodesPositions.shift();
            props.setSelectVal(key);
            return
        } else {
            props.setSelectVal(key);
        };
    };
    useEffect(() => {
        props.setDataRequest(props.selectVal);
    }, [props.selectVal])
    //请求完后清空数据
    useEffect(() => {
        props.setSelectVal([]);
    }, [props.isDone])
    useEffect(() => {
        props.setSelectVal([]);
    }, [props.isCancel])
    return (
        <div>
            <div
                className={styles.authorlzation}
            >
                <Tree
                    checkable
                    onCheck={onCheck}
                    treeData={treeData}
                    checkedKeys={props.selectVal.length ? props.selectVal : (props.selectDataVal[0] != undefined ? props.selectDataVal : [])}
                />
            </div>
        </div>
    );
};

export default AuthorIzation;
