import request from '~/service';

export function reNewBankList () {
  return request.post('/AERC/rest/Bank');
}

export function getBankList () {
  return request.get('/AERC/rest/Bank');
}
