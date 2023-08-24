import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import styles from './index.less';

interface CaptchaInputProps {
  sessionUid: string;
  ramdomKey: string; // 用于刷新校验码
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({ sessionUid, ramdomKey }) => {
  const intl = useIntl();
  const [ts, setTs] = useState('');

  return (
    <Input.Group compact>
      <Form.Item
        shouldUpdate
        name={'sessionCode'}
        rules={[{ required: true, message: '请输入验证码！' }]}
        className={styles.btn}
      >
        <Input
          // autoComplete="new-password"
          prefix={<SafetyOutlined style={{ color: '#ccc', fontSize: '18px' }} />}
          className={styles.captchaInp}
          placeholder='验证码'
          style={{
            width: '200px',
            height: '45px',
            marginRight: 10,
            padding: '6.5px 11px 6.5px 11px',
            verticalAlign: 'middle',
            borderRadius: '4px',
          }}
        />
      </Form.Item>
      <img
        style={{
          width: '90px',
          height: '33px',
          verticalAlign: 'middle',
          padding: '5.85px 0px 0px 0px',
          float: 'right',
        }}
        src={`/api/auth/getCaptcha?sessionUid=${sessionUid}&ts=${ts}&r=${ramdomKey}`}
        onClick={() => {
          setTs(`${Date.now()}`);
        }}
      />
    </Input.Group>
  );
};
export default CaptchaInput;
