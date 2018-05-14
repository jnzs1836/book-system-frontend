import { queryRule, removeCard, addRule } from '../services/api';

export default {
  namespace: 'card',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
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
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeCard, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      const tmp = {
        ...state,
        data: action.payload,
      };
      return tmp;
    },
  },
};
