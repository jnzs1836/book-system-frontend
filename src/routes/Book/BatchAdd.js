import { Form, Upload, Icon } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BatchAdd extends PureComponent {
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
    const props = {
      name: 'file',
      showUploadList: false,
      action: '/form.upload',
    };

    const Dragger = Upload.Dragger;

    return (
      <div>
        <div style={{ width: 246, height: 140 }}>
          <Dragger {...props}>
            <Icon type="plus" />
          </Dragger>
        </div>
        <div style={{ marginTop: 16, height: 180 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
            <p className="ant-upload-hint">
              支持单个或批量上传，严禁上传公司内部资料及其他违禁文件
            </p>
          </Dragger>
        </div>
      </div>
    );
  }
}
