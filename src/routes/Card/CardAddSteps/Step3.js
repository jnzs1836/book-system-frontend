import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from 'components/Result';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/card/add'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            借阅卡号：
          </Col>
          <Col span={16}>{data.card_id}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            借阅人：
          </Col>
          <Col span={16}>{data.name}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            身份：
          </Col>
          <Col span={16}>{data.identity}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            可借书量：
          </Col>
          <Col span={16}>
            <span className={styles.money}>{data.quantity}</span>
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          继续添加
        </Button>
        <Button>查看用户</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="添加成功"
        description="新用户已添加"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.card.new_card,
}))(Step3);
