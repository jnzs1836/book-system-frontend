import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

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

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BookAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'form/submitBookAddForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting, id } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="添加书籍" content="填写下列表单，可以添加书籍">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Form.Item {...formItemLayout} label={fieldLabels.name}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入书籍标题' }],
              })(<Input placeholder="请输入书籍标题" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label={fieldLabels.author}>
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '请输入书籍作者' }],
              })(<Input style={{ width: '100%' }} placeholder="请输入书籍作者" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label={fieldLabels.press}>
              {getFieldDecorator('press', {
                rules: [{ required: true, message: '请输入出版社' }],
              })(<Input style={{ width: '100%' }} placeholder="请输入出版社" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label={fieldLabels.quantity}>
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: '请输入书籍总量' }],
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入书籍总量" />)}
            </Form.Item>

            <FormItem {...formItemLayout} label="借阅规则" help="同学、教师默认可借阅">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">可借阅</Radio>
                    <Radio value="2">部分可借阅</Radio>
                    <Radio value="3">不可借阅</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="可借阅"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">校外人员</Option>
                      <Option value="2">同学</Option>
                      <Option value="3">教师</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                htmlType="submit"
                loading={submitting}
              >
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
