import request from '~/service';

export function getBulletin () {
  return request.get('/AERC/rest/Bulletin');
}

export function editBulletin (data) {
  return request.patch('/AERC/rest/Bulletin', data);
}

export function addBulletin (data) {
  return request.post('/AERC/rest/Bulletin', data);
}

export function uploadBulletinFile (data) {
  // const urlData = bulletInSNo;
  // let dataSNo = '';
  // data.forEach(item => {
  //   dataSNo += ',' + item;
  // });
  const urlData = 42;
  const dataSNo1 = 34;
  const dataSNo2 = 35;
  return request.post(`/AERC/rest/BulletinUploader/${urlData}/${dataSNo1},${dataSNo2}`, data);
}
