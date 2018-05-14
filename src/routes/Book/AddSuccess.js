import React, { Fragment, PureComponent } from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva/index';
import { Form } from 'antd/lib/index';
import { routerRedux } from 'dva/router';

// import routerRedux from Redux
const { Step } = Steps;

@connect(({ loading }) => ({
  // submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class AddSuccess extends PureComponent {
  render() {
    const { dispatch } = this.props;

    const goBookList = () => {
      console.log('we are in');
      dispatch(routerRedux.push('/book/show'));
    };
    const actions = (
      <Fragment>
        <Button onClick={goBookList} type="primary">
          返回列表
        </Button>
        {/*<Button>查看书籍</Button>*/}
      </Fragment>
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Result
            type="success"
            title="书籍新建成功"
            description="您已成功新建书籍，可以在列表中看到该书。"
            // extra={extra}
            actions={actions}
            style={{ marginTop: 48, marginBottom: 16 }}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
