export function headerLimit (item, tag) {
  const permit = item.data[0].permit;
  let result;
  //   console.log('XXXXXXXXXXXXXXXXXXXX' + (parseInt(permit.indexOf('C_01')) < 0));
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
      console.log('XXXXXXXXXXXXXXXXXXXX');
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
    default:
      result = true;
      break;
  }
  console.log(tag);
  console.log(result);
  return result;
}
