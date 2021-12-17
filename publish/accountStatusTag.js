
export const AccountStatus = {
  Verifying: 0,
  Enable: 1,
  Disable: 2
};

export const accountTagList = [];

accountTagList[AccountStatus.Verifying] = '驗證中';
accountTagList[AccountStatus.Enable] = '啟用中';
accountTagList[AccountStatus.Disable] = '停用中';
