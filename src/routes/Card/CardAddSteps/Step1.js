import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

// @connect()
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          console.log(values);
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          console.log(values);
          dispatch(routerRedux.push('/card/add/confirm'));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="用户姓名">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{ required: true, message: '请输入用户姓名' }],
            })(<Input placeholder="请输入用户姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="用户邮箱">
            <Input.Group compact>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入账户' },
                  { type: 'email', message: '账户名应为邮箱格式' },
                ],
                initialValue: data.email,
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="user@example.com" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="用户密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入用户密码' }],
            })(<Input type="password" placeholder="" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="身份">
            {getFieldDecorator('identity', {
              initialValue: 'student',
              rules: [{ required: true, message: '请选择身份' }],
            })(
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="others">校外人员</Option>
                <Option value="student">学生</Option>
                <Option value="teacher">教师</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="可借阅量">
            {getFieldDecorator('quantity', {
              inititialValue: 3,
              rules: [{ required: true, message: '请输入数量' }],
            })(<InputNumber placeholder={''} />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc} />
      </Fragment>
    );
  }
}

export default connect(({ form }) => ({
  data: form.card.new_card,
}))(Step1);
