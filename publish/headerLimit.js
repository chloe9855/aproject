export function headerLimit (item, tag) {
  const permit = item.data[0].permit;
  let result;
  switch (tag) {
    case '作業基金土地管理':
      result = parseInt(permit.indexOf('A_01')) > -1;
      break;
    case '地理資訊圖台':
      result = parseInt(permit.indexOf('B')) > -1;
      break;
    case '灌溉地管理':
      result = parseInt(permit.indexOf('C_01')) > -1;
      break;
    case '灌溉地籍查詢':
      result = parseInt(permit.indexOf('C_01')) > -1;
      break;
    case '停灌補償申報':
      result = parseInt(permit.indexOf('C_02')) > -1;
      break;
    case '停灌資料異動':
      result = parseInt(permit.indexOf('C_03')) > -1;
      break;
    case '統計報表':
      result = parseInt(permit.indexOf('C_04')) > -1;
      break;
    case '系統管理':
      result = parseInt(permit.indexOf('D_01')) > -1;
      break;
    case '帳號管理':
      result = parseInt(permit.indexOf('D_01')) > -1;
      break;
    case '群組權限管理':
      result = parseInt(permit.indexOf('D_02')) > -1;
      break;
    case '首頁資料管理':
      result = parseInt(permit.indexOf('D_03')) > -1;
      break;
    case '系統使用量統計':
      result = parseInt(permit.indexOf('D_04')) > -1;
      break;
    default:
      result = true;
      break;
  }
  // console.log(result);
  return true;
}
