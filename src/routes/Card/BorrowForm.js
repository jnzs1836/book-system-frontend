import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

export default class BorrowForm extends PureComponent {
  constructor(props) {
    super(props);
    const newData = props.value.map((item, index) => {
      return { ...item, key: (index + 1).toString() };
    });
    console.log(newData);

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

  delayBook(e, key) {
    const bookArray = this.state.data.filter(item => item.key === key);
    const delayedBook = bookArray[0];
    const { dispatch } = this.props;
    dispatch({
      type: 'form/delayBook',
      payload: {
        id: delayedBook.id,
      },
    }).then(() => {
      this.remove(key);
    });
  }
  returnBook(key) {
    const returnedBookArray = this.state.data.filter(item => item.key === key);
    const returnedBook = returnedBookArray[0];
    const { dispatch } = this.props;
    dispatch({
      type: 'form/finishRecord',
      payload: {
        id: returnedBook.id,
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
      card_id: '',
      card_name: '',
      borrow_date: '',
      due_date: '',
      fine: '',
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

      if (!target.book_id || !target.borrow_date) {
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
      this.setState({
        loading: false,
      });
      const newRecord = {
        ...target,
        book_id: this.props.book_id,
      };
      dispatch({
        type: 'form/submitNewRecord',
        payload: newRecord,
      });
    }, 500);
    console.log(this.state);
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
    console.log('test');
    console.log(this.state.data);

    const columns = [
      {
        title: '书籍号',
        dataIndex: 'book_id',
        key: 'name',
        width: '15%',
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
        title: '书名',
        dataIndex: 'book_name',
        key: 'book_name',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'card_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="书名"
              />
            );
          }
          return text;
        },
      },
      {
        title: '借书时间',
        dataIndex: 'borrow_date',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'borrow_date', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder={new Date().toDateString()}
              />
            );
          }
          return text;
        },
      },
      {
        title: '归还时间',
        dataIndex: 'due_date',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={'自动设定'}
                defaultValue={'自动设定'}
                onChange={e => this.handleFieldChange(e, 'department', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="所属部门"
              />
            );
          }
          return text;
        },
      },
      {
        title: '罚金',
        dataIndex: 'fine',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={'自动设定'}
                defaultValue={'自动设定'}
                onChange={e => this.handleFieldChange(e, 'department', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="所属部门"
              />
            );
          }
          return text;
        },
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
                  <Popconfirm title="是否放弃借阅？" onConfirm={() => this.remove(record.key)}>
                    <a>取消</a>
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
              <a onClick={e => this.delayBook(e, record.key)}>延期</a>

              {/*<a onClick={e => this.toggleEditable(e, record.key)}>延期</a>*/}
              <Divider type="vertical" />
              <Popconfirm title="确认书本已经归还？" onConfirm={() => this.returnBook(record.key)}>
                <a>归还</a>
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
          新增借阅
        </Button>
      </Fragment>
    );
  }
}
