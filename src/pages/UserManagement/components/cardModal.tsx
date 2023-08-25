import { ProCard, ModalForm, ActionType } from '@ant-design/pro-components';
import { useState, useEffect, useRef } from 'react';
import AuthorizationMenu from './authorizationMenu';
import AuthorizationData from './authorizationData';
import { APIRole } from '@/services/digital/role';
import Icon from '@ant-design/icons';
import { ReactComponent as UpdateIcon } from '@/assets/icons/modal/update.svg';

interface CaradType {
    cardModal: any,
    setCardModal: any,
    requestId: any,
    dataList: any,
    treeData: any,
    selectData: any,
    selectDataVal: any,
    record: any,
}
const CardModal: React.FC<CaradType> = (props: any) => {
    const [tab, setTab] = useState('1');
    const [menuRequest, setMenuRequest] = useState([]);
    const [dataRequest, setDataRequest] = useState([]);
    const [isDone, setIsDone] = useState(1);
    const [selectVal, setSelectVal]: any = useState([]);

    return (
        <>
            <ModalForm
                open={props.cardModal}
                onOpenChange={props.setCardModal}
                title={
                    <div style={{ marginBottom: '27px' }}>
                        <Icon component={UpdateIcon} style={{ fontSize: '22px' }} />
                        <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>权限分配-角色[{props.record?.name}]</span>
                    </div>
                }
                width={820}
                onFinish={async () => {
                    //菜单请求
                    const body = {
                        menuIds: menuRequest,
                        roleId: props.requestId,
                    };
                    await APIRole.updateMenu(body);
                    // //数据请求
                    // const params = {
                    //     permissionIdList: dataRequest.length ? dataRequest : props.selectDataVal[0] != undefined ? props.selectDataVal : [],
                    //     roleId: props.requestId,
                    //     type: 3,
                    // };
                    // await APIRole.updateMenu(params);
                    setIsDone(isDone + 1);
                    props.setCardModal(false);
                    console.log(menuRequest,props.requestId,'获取确定时间--')

                }}
                modalProps={{
                    onCancel: () => {
                        setSelectVal([]);
                    }
                }}
            >
                <ProCard
                    className='authorizationCard'
                    tabs={{
                        activeKey: tab,
                        items: [
                            {
                                label: `菜单权限`,
                                key: '1',
                                children: <AuthorizationMenu
                                    show={props.cardModal}
                                    treeData={props.treeData}
                                    selectData={props.selectData}
                                    setMenuRequest={setMenuRequest}
                                />
                            },
                            {
                                label: `数据权限`,
                                key: '2',
                                children: <AuthorizationData
                                    selectDataVal={props.selectDataVal}
                                    // dataList={props.dataList}
                                    setDataRequest={setDataRequest}
                                    isDone={isDone}
                                    selectVal={selectVal}
                                    setSelectVal={setSelectVal}
                                />
                            },
                        ],
                        onChange: (key) => {
                            setTab(key);
                        },
                    }}
                />
            </ModalForm>
        </>
    );
};
export default CardModal;