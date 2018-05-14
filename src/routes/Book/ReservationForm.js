import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

export default class ReservationForm extends PureComponent {
  constructor(props) {
    super(props);

    const newData = props.value.map((item, index) => {
      return { key: index + 1, ...item };
    });

    this.state = {
      data: newData,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }

  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  acceptReservation(e, key) {
    const acceptArray = this.state.data.filter(item => item.key === key);
    const accept = acceptArray[0];
    const { dispatch } = this.props;
    dispatch({
      type: 'form/makeReservation2Record',
      payload: {
        id: accept.id,
      },
    }).then(() => {
      this.remove(key);
    });
  }

  abandonReservation(key) {
    const abandonedArray = this.state.data.filter(item => item.key === key);
    const abandoned = abandonedArray[0];
    const { dispatch } = this.props;
    dispatch({
      type: 'form/abandonReservation',
      payload: {
        id: abandoned.id,
      },
    }).then(() => {
      this.remove(key);
    });
  }

  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }

  newMember = () => {
    const newData = this.state.data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    const { dispatch } = this.props;
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.card_id) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
      const newRecord = {
        ...target,
        book_id: this.props.book_id,
      };
      dispatch({
        type: 'form/submitNewReservation',
        payload: newRecord,
      });
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: '记录编号',
        dataIndex: 'id',
        width: '20%',
      },
      {
        title: '借阅卡号',
        dataIndex: 'card_id',
        key: 'name',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'card_id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="借阅卡号"
              />
            );
          }
          return text;
        },
      },
      {
        title: '借阅人',
        dataIndex: 'card_name',
        key: 'card_name',
        width: '30%',
        // render: (text, record) => {
        // if (record.editable) {
        //     return (
        //         <Input
        //             value={text}
        //             onChange={e => this.handleFieldChange(e, 'workId', record.key)}
        //             onKeyPress={e => this.handleKeyPress(e, record.key)}
        //             placeholder="工号"
        //         />
        //     );
        // }
        // return text;
        // },
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要放弃预约？" onConfirm={() => this.remove(record.key)}>
                    <a>放弃</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>修改</a>
              <Divider type="vertical" />

              <a onClick={e => this.acceptReservation(e, record.key)}>接受</a>

              <Divider type="vertical" />
              <Popconfirm
                title="是否要拒绝请求？"
                onConfirm={() => this.abandonReservation(record.key)}
              >
                <a>拒绝</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增预约
        </Button>
      </Fragment>
    );
  }
}
