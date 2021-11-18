import request from '~/service';
export function getIrrigationLandArea (query) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            pagemax: 25,
            sum_grp: 1200000,
            sum_tolarea: 3400000,
            sum_irgarea: 5600000
          }
        ]
      });
    });
  }
  const q = [];
  if (query) q.push(`query=${JSON.stringify(query)}`);
  return request.get('/aerc/rest/IrrigationLandArea' + (q ? `?${q.join('&')}` : ''));
}

export function getIrrigationLand (PageCnt, PageRows, query, county, town, section, land) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            county_name: '',
            town_name: '',
            sec_cns: '',
            land_no: '',
            ia_cns: 'XX分處鹿草工作站',
            mng_cns: '山子腳',
            stn_cns: '山子腳-山腳',
            grp_cns: 'XXX小組',
            grparea: 2050 + PageCnt,
            tolarea: 2050,
            irgarea: 2050,
            hltarea: 2050,
            nonarea: 2050
          },
          {
            county_name: '',
            town_name: '',
            sec_cns: '',
            land_no: '',
            ia_cns: 'XX分處鹿草工作站',
            mng_cns: '山子腳',
            stn_cns: '山子腳-山腳',
            grp_cns: 'XXX小組',
            grparea: 2050 + PageCnt,
            tolarea: 2050,
            irgarea: 2050,
            hltarea: 2050,
            nonarea: 2050
          },
          {
            county_name: '',
            town_name: '',
            sec_cns: '',
            land_no: '',
            ia_cns: 'XX分處鹿草工作站',
            mng_cns: '山子腳',
            stn_cns: '山子腳-山腳',
            grp_cns: 'XXX小組',
            grparea: 2050 + PageCnt,
            tolarea: 2050,
            irgarea: 2050,
            hltarea: 2050,
            nonarea: 2050
          }
        ]
      });
    });
  }
  const q = [];
  if (PageCnt) q.push(`PageCnt=${PageCnt}`);
  if (PageRows) q.push(`PageRows=${PageRows}`);
  if (query) q.push(`query=${JSON.stringify(query)}`);
  if (county) q.push(`county=${county}`);
  if (town) q.push(`town=${town}`);
  if (section) q.push(`Section=${section}`);
  if (land) q.push(`land_no=${land}`);
  return request.get('/aerc/rest/IrrigationLand' + (q ? `?${q.join('&')}` : ''));
}

export function getIas () {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Ia: '11',
            Ia_cns: '嘉南管理處',
            Area: 154060769.86,
            Ymd: '2011-07-24T00:00:00'
          }
        ]
      });
    });
  }
  return request.post('/aerc/rest/Ia');
}

export function getMngs (Ia) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Ia: '11',
            Ia_cns: '嘉南管理處',
            Mng: '',
            Mng_cns: 'Unknown',
            Area: 154060769.86,
            Ymd: '2011-07-24T00:00:00'
          }
        ]
      });
    });
  }
  return request.post('/aerc/rest/Mngs', (Ia ? `Ia=${Ia}` : ''));
}

export function getStns (Ia, Mng) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Ia: '11',
            Ia_cns: '嘉南管理處',
            Mng: '',
            Mng_cns: '',
            Stn: '11',
            Stn_cns: '苗栗站',
            Area: 154060769.86,
            Ymd: '2011-07-24T00:00:00'
          }
        ]
      });
    });
  }
  const q = [];
  if (Ia) q.push(`Ia=${Ia}`);
  if (mng) q.push(`Mng=${mng}`);
  return request.post('/aerc/rest/Stn', (q ? q.join('&') : ''));
}

export function getGrps (Ia, Mng, Stn) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Ia: '11',
            Ia_cns: '嘉南管理處',
            Mng: '',
            Mng_cns: '',
            Stn: '11',
            Stn_cns: '苗栗站',
            Grp: '01',
            Grp_cns: '嘉盛小組',
            Area: 154060769.86,
            Ymd: '2011-07-24T00:00:00'
          }
        ]
      });
    });
  }
  const q = [];
  if (Ia) q.push(`Ia=${Ia}`);
  if (Mng) q.push(`Mng=${Mng}`);
  if (Stn) q.push(`Stn=${Stn}`);
  return request.post('/aerc/rest/Stn', (q ? q.join('&') : ''));
}

export function getCounties () {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            COUNTYCODE: '11',
            COUNTYNAME: '嘉南管理處',
            COUNTYENG: ''
          }
        ]
      });
    });
  }
  return request.post('/aerc/rest/County');
}

export function getTowns (county) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            TOWNCODE: '11',
            TOWNNAME: '嘉南管理處',
            TOWNENG: ''
          }
        ]
      });
    });
  }
  const q = [];
  if (county) q.push(`CountyID=${county}`);
  return request.post('/aerc/rest/Town', (q ? q.join('&') : ''));
}

export function getSections (county, town) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Section: '11',
            Sec_cns: '嘉南管理處',
            Area: 140057.843883,
            Ymd: '2011-07-24T00:00:00'
          }
        ]
      });
    });
  }
  const q = [];
  if (county) q.push(`CountyID=${county}`);
  if (town) q.push(`TownID=${town}`);
  return request.post('/aerc/rest/Section', (q ? q.join('&') : ''));
}

export function getLands (county, town, section) {
  if (window.location.host === '192.168.1.103:3000') {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            FID: 11,
            Land: '11',
            Land_no: '11'
          }
        ]
      });
    });
  }
  const q = [];
  if (county) q.push(`CountyID=${county}`);
  if (town) q.push(`TownID=${town}`);
  if (section) q.push(`Section=${section}`);
  return request.post('/aerc/rest/Sec5cov', (q ? q.join('&') : ''));
}
