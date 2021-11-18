import request from '~/service';

export function getIrrigationLand1 (data) {
  return request.post('/aerc/rest/IrrigationLand?pageCnt=1&pageRows=10', {
    query: [['11', '4', '', '']]
  });
}
