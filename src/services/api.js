import { stringify } from 'qs';
import request from '../utils/request';

const api = '';
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/card?${stringify(params)}`);
}

export async function addRecord(params) {
  return request('/api/record/create', {
    method: 'POST',
    body: {
      ...params,
      method: 'create',
    },
  });
}

export async function addReservation(params) {
  return request('/api/application/create', {
    method: 'POST',
    body: {
      ...params,
      method: 'create',
    },
  });
}

export async function reservation2Record(params) {
  return request('/api/record/deal', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function returnBook(params) {
  return request('/api/record/return', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteReservation(params) {
  return request('/api/application/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function delayRecord(params) {
  return request('/api/record/delay', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryBook(params) {
  console.log(params);
  return request(`/api/book?${stringify(params)}`);
}

export async function getBook(params) {
  return request('/api/book/' + params.id);
}

export async function removeBook(params) {
  return request('/api/book/delete/' + params.id, {
    method: 'POST',
    body: {
      ...params,
      // method: 'delete',
    },
  });
}

export async function removeCard(params) {
  return request('/api/card/delete/' + params.id, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addBook(params) {
  return request('/api/book', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateBook(params) {
  return request('/api/book/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateBookDetail(params) {
  return request('/api/book/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export function postCard(params) {
  return request('/api/card/', {
    method: 'POST',
    body: params,
  });
}

export async function createBook(params) {
  console.log(params);
  return request('/api/book', {
    method: 'POST',
    body: params,
  });
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function accountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function userRegister(params) {
  console.log(params);
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
