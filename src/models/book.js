import { queryBook, removeBook, addBook, queryRule, getBook } from '../services/api';

export default {
  namespace: 'book',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    current: {},
  },

  effects: {
    *fetchOne({ payload }, { call, put }) {
      console.log('request');

      const response = yield call(getBook, payload);
      console.log(response);

      yield put({
        type: 'setBook',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBook, payload);
      const get = {
        list: response,
        pagination: {
          total: response.length,
          pageSize: 10,
          current: 1,
        },
      };
      yield put({
        type: 'save',
        payload: get,
      });
      yield put({
        type: 'form/saveBook',
        payload: get.list[0],
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addBook, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeBook, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    setBook(state, action) {
      const sb = {
        ...state,
        current: {
          ...state.current,
          ...action.payload,
          reservation: action.payload.applications,
        },
      };
      return sb;
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
