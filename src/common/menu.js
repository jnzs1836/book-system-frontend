import { isUrl } from '../utils/utils';

const menuData = [
  //
  {
    name: '书籍管理',
    icon: 'table',
    path: 'book',
    children: [
      {
        name: '书籍列表',
        path: 'show',
      },
      {
        name: '添加书籍',
        path: 'add',
      },
      {
        name: '批量上传',
        path: 'batch',
      },
    ],
  },
  {
    name: '借阅管理',
    icon: 'profile',
    path: 'card',
    children: [
      {
        name: '用户列表',
        path: 'show',
      },
      {
        name: '添加用户',
        path: 'add',
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
