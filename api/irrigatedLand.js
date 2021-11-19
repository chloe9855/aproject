import request from '~/service';

export function getIrrigationLand1 (data) {
  const config = {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: [['11', '4', '', '']]
    })
  };
  console.log(config);

  return request.get('/aerc/rest/IrrigationLand?pageCnt=1&pageRows=10', config);
}
