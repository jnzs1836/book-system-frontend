import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  delayRecord,
  fakeSubmitForm,
  createBook,
  postCard,
  updateBookDetail,
  updateBook,
  addRecord,
  addReservation,
  reservation2Record,
  deleteReservation,
} from '../services/api';

export default {
  namespace: 'form',

  state: {
    book: {
      new_record: {
        card_id: '',
        borrow_date: '',
      },
    },
    step: {},
    card: {
      new_card: {},
    },
  },

  effects: {
    *submitNewCardStep({ payload }, { call }) {
      const tmp = call(postCard, payload);
      yield tmp;
      message.success('提交成功');
    },
    *submitNewRecord({ payload }, { call }) {
      const tmp = call(addRecord, payload);
      yield tmp;
      message.success('提交成功');
    },
    *submitNewReservation({ payload }, { call }) {
      const tmp = call(addReservation, payload);
      yield tmp;
      message.success('提交成功');
    },
    *makeReservation2Record({ payload }, { call }) {
      const tmp = call(reservation2Record, payload);
      yield tmp;
      message.success('提交成功');
    },
    *finishRecord({ payload }, { call }) {
      const tmp = call(reservation2Record, payload);
      yield tmp;
      message.success('提交成功');
    },
    *delayBook({ payload }, { call }) {
      const tmp = call(delayRecord, payload);
      yield tmp;
      message.success('提交成功');
    },
    *abandonReservation({ payload }, { call }) {
      const tmp = call(deleteReservation, payload);
      yield tmp;
      message.success('提交成功');
    },
    *submitBookManageForm({ payload }, { call }) {
      const tmp = call(updateBook, payload);
      yield tmp;
      message.success('提交成功');
    },
    *submitBookAddForm({ payload }, { call }) {
      yield call(createBook, payload);
      message.success('提交成功');
    },
    *submitBookForm({ payload }, { call }) {
      yield call(updateBookDetail, payload);
      message.success('提交成功');
    },
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitCardAddForm({ payload }, { call, put }) {
      yield call(postCard, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/card/add/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *goCardManage({ payload }, { call }) {
      yield put(routerRedux.push('/card/manage'));
    },
    // * postCard({payload},{call}){
    //     yield call(postCard, payload);
    //     message.success('提交成功');
    // }
  },

  reducers: {
    setBook(state, { payload }) {
      return {
        ...state,
        book: {
          ...state.book,
          ...payload,
        },
      };
    },
    saveStepFormData(state, { payload }) {
      // dispatch()
      // let responseJson = postCard(payload);
      let refresh = {
        ...payload,
        // card_id: responseJson.card_id,
      };
      let new_state = {
        ...state,
        card: {
          ...state.card,
          new_card: {
            ...state.card.new_card,
            ...refresh,
          },
        },
      };
      //
      // console.log("------oooooo-----------");
      // console.log(new_state);
      return new_state;
    },
  },
};
