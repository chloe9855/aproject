import request from '~/service';

export function getAccount (id) {
  const accountRequest = id ? `/aerc/rest/Account?ID=${id}` : '/aerc/rest/Account';
  return request.get(accountRequest);
}

export function editAccount () {
  return request.patch('/AERC/rest/Account', data);
}

export function addAccount () {
  return request.post('/AERC/rest/Account', data);
}
