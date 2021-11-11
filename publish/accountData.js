export function accountData (data) {
  console.log(data);
  const body = [];
  function switchTag (d) {
    let result = '';
    switch (d) {
      case 0:
        result = '驗證中';
        break;
      case 1:
        result = '啟用中';
        break;
      case 2:
        result = '停用中';
        break;
    }
    return result;
  }
  data.forEach((element, index) => {
    const titleObj = [];
    titleObj.push(element.account);
    titleObj.push(element.name);
    titleObj.push(element.ianame);
    titleObj.push(element.ia);
    titleObj.push(element.groupname);
    titleObj.push(element.logintime);
    titleObj.push(switchTag(element.status));
    body.push({ val: index, title: titleObj });
  });
  console.log('body:');
  console.log(body);
  return body;
}
