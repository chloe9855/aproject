import request from '~/service';
// import axios from 'axios';
export function getIrrigationLandArea (query) {
  if (window.location.host === '210.65.139.69') {
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
  if (window.location.host === '210.65.139.69') {
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

export function getIas (data) {
  const user = sessionStorage.getItem('loginUser');
  return request.post(`/aerc/rest/Ia/${user}`, data);
}

export function getMngs (Ia) {
  const data = Ia ? { Ia: Ia } : {};
  return request.post('/aerc/rest/mng', data);
}

/**
 *
 * @param {string} Ia
 * @returns {Promise<import('axios').AxiosResponse<import('types/Stn').Stn[]>}
 */
export function getStns (Ia, Mng) {
  // const data = { Ia: Ia, Mng: Mng || '' };
  const data = Mng !== '' ? { Ia: Ia, Mng: Mng } : { Ia: Ia };
  return request.post('/aerc/rest/Stn', data);
}

/**
 * @typedef {import('types/Grp').Grp} Grp
 */

/**
 *
 * @param {string} Ia
 * @returns {Promise<import('axios').AxiosResponse<Grp[]>}
 */
export function getGrps (Ia, Mng, Stn) {
  const data = Mng !== '' ? { Ia: Ia, Mng: Mng, Stn: Stn } : { Ia: Ia, Stn: Stn };
  // const data = {
  //   Ia: Ia,
  //   Mng: Mng || '',
  //   Stn: Stn || ''
  // };
  return request.post('/aerc/rest/Grp', data);
}

export function getCounties () {
  const data = {};
  return request.post('/aerc/rest/County', data);
}

export function getTowns (county) {
  const data = county ? { CountyID: county } : {};
  return request.post('/aerc/rest/Town', data);
}

export function getSections (county, town) {
  const data = {
    CountyID: county,
    TownID: town || ''
  };
  return request.post('/aerc/rest/Section', data);
}

export function getLands (county, town, section) {
  if (window.location.host === '210.65.139.69') {
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

export function getSecNo (county, section) {
  const secNoRequest = `/aerc/rest/Sec5no?CountyID=${county}&Section=${section}`;
  return request.get(secNoRequest);
}

export function getSecNoList (county, section) {
  const secNoListRequest = `/aerc/rest/Sec5nos?CountyID=${county}&Section=${section}`;
  return request.get(secNoListRequest);
}

export function getDownloadIrrigationLand (data) {
  const secNoListRequest = '/aerc/rest/DownloadIrrigationLand';
  return request.post(secNoListRequest, data);
}

export function getFarmer (data) {
  return request.get('/AERC/rest/Farmer');
}

export function getOwner (data) {
  return request.post('/AERC/rest/Owner', data);
}
