import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/card/add/info'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitCardAddForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    console.log(data);
    const identityMap = {
      other: '校外人员',
      student: '学生',
      teacher: '教师',
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="系统将自动发送邮件，请注意查收"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="借阅人名">
          {data.name}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="身份">
          {identityMap[data.identity]}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="电子邮件">
          {data.email}
        </Form.Item>
        {/*<Form.Item {...formItemLayout} className={styles.stepFormText} label="激活码">*/}
        {/*<span className={styles.money}>{data.amount}</span>*/}
        {/*<span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>*/}
        {/*</Form.Item>*/}
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="激活码" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: '需要输入激活码才能完成用户添加',
              },
            ],
          })(<Input type="text" autoComplete="off" style={{ width: '80%' }} />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.card.new_card,
}))(Step2);
