import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
  InputNumber,
} from 'antd';
import form_styles from './style.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from '../Forms/TableForm';
import styles from './style.less';
import ReservationForm from './ReservationForm';
import BorrowForm from './BorrowForm';
import { routerRedux } from 'dva/router';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: '书籍标题',
  author: '作者',
  press: '出版社',
  quantity: '总量',
  stock: '库存量',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const borrowFieldLabels = {
  borrow_date: '借阅时间',
  due_date: '预计归还时间',
  fine: '罚金',
};
const borrowData = [
  {
    key: '1',
    card_id: '1',
    card_name: 'Xinghong Zhang',
    borrow_date: '2018-04-03',
    due_date: '2018-05-09',
    fine: 1,
  },
];

const tableData = [
  {
    key: '1',
    card_id: '1',
    card_name: 'Xinghong Zhang',
    book_name: 'John Brown',
    book_id: '1222',
  },
  {
    key: '1',
    card_id: '1',
    card_name: 'Xinghong Zhang',
    book_name: 'John Brown',
    book_id: '1222',
  },
  {
    key: '1',
    card_id: '1',
    card_name: 'Xinghong Zhang',
    book_name: 'John Brown',
    book_id: '1222',
  },
];

class CardManage extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, submitting, book } = this.props;
    console.log(form);
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };

    const demo = () => {
      dispatch({
        type: 'form/submitCardAddForm',
        payload: {},
      });
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/card/add/confirm'));
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout
        title="借阅卡管理"
        content="此处用于管理借阅卡的信息、借阅状态与预约信息"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="借阅卡用户信息" className={form_styles.card} bordered={false}>
          <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
            <Form.Item {...formItemLayout} label="用户姓名">
              {getFieldDecorator('name', {
                initialValue: 'sa',
                rules: [{ required: true, message: '请输入用户姓名' }],
              })(<Input placeholder="请输入用户姓名" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="用户邮箱">
              <Input.Group compact>
                {getFieldDecorator('receiverAccount', {
                  rules: [
                    { required: true, message: '请输入收款人账户' },
                    { type: 'email', message: '账户名应为邮箱格式' },
                  ],
                })(
                  <Input style={{ width: 'calc(100% - 100px)' }} placeholder="user@example.com" />
                )}
              </Input.Group>
            </Form.Item>
            <Form.Item {...formItemLayout} label="用户密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入用户密码' }],
              })(<Input type="password" placeholder="" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份">
              {getFieldDecorator('itentity', {
                // initialValue: data.amount,
                rules: [{ required: true, message: '请选择身份' }],
                initialValue: 'student',
              })(
                <Select style={{ width: 100 }}>
                  <Option value="others">其他</Option>
                  <Option value="student">学生</Option>
                  <Option value="teacher">教师</Option>
                </Select>
              )}
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
              <Button type="primary" onClick={demo}>
                下一步
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="借阅管理" className={styles.card} bordered={false}>
          {getFieldDecorator('borrow', {
            initialValue: borrowData,
          })(<BorrowForm />)}
        </Card>

        <Card title="预约管理" bordered={false}>
          {getFieldDecorator('reservation', {
            initialValue: tableData,
          })(<ReservationForm />)}
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading, form }) => ({
  book: form.book,
  data: form.step,
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(CardManage));
