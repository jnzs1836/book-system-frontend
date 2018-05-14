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
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from '../Forms/TableForm';
import styles from './style.less';
import ReservationForm from './ReservationForm';
import BorrowForm from './BorrowForm';

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

class BookManage extends PureComponent {
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
    const { form, dispatch, submitting, current_book } = this.props;
    // const id = this.props.params.id;

    let records = current_book.records;
    let reservation = current_book.reservation;
    // let applications = current_book.applications;
    // console.log(id);
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        console.log(values);
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitBookManageForm',
            payload: values,
          });
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
        title="书籍管理"
        content="此处用于管理书籍的信息、借阅状态与预约信息"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="书籍信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入书籍标题' }],
                    initialValue: current_book.name,
                  })(<Input placeholder={form.name} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.author}>
                  {getFieldDecorator('author', {
                    rules: [{ required: true, message: '请输入书籍作者' }],
                    initialValue: current_book.author,
                  })(<Input style={{ width: '100%' }} placeholder="请输入书籍作者" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.press}>
                  {getFieldDecorator('press', {
                    rules: [{ required: true, message: '请输入出版社' }],
                    initialValue: current_book.press,
                  })(<Input style={{ width: '100%' }} placeholder={current_book.press} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                {/*<Form.Item label={fieldLabels.quantity}>*/}
                {/*{getFieldDecorator('quantity', {*/}
                {/*rules: [{ required: true, message: '请输入书籍总量' }],*/}
                {/*initialValue:current_book.quantity,*/}
                {/*})(*/}
                {/*<InputNumber style={{ width: '100%' }} placeholder="请输入书籍总量"/>*/}

                {/*)}*/}
                {/*</Form.Item>*/}
                <Form.Item label={fieldLabels.quantity}>
                  {getFieldDecorator('stock', {
                    rules: [{ required: true, message: '请输入书籍库存量' }],
                    initialValue: current_book.quantity,
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入书籍库存量" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="借阅管理" className={styles.card} bordered={false}>
          {getFieldDecorator('records', {
            initialValue: records,
            // book_id : current_book.id,
          })(<BorrowForm book_id={current_book.id} dispatch={dispatch} />)}
        </Card>
        <Card title="预约管理" bordered={false}>
          {getFieldDecorator('reservation', {
            initialValue: reservation,
          })(<ReservationForm book_id={current_book.id} dispatch={dispatch} />)}
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

export default connect(({ global, loading, form, book }) => ({
  current_book: form.book,
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(BookManage));
