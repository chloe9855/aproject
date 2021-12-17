export interface Account {
    name: string,
    account: string,
    /**
     * 管理處代碼
     */
    ia: string,
    /**
     * 管理處名稱
     */
    ianame: string,
    /**
     * 管理分處代碼
     */
    mng: string,
    mngname: string,
    /**
     * 工作站代碼 
     */
    stn: string,
    /**
     * 工作站名稱
     */
    stnname: string,
    /**
     * 水利小組代碼 
     */
    grp: string,
    /**
     * 水利小組名稱 
     */
    grpname: string,
    mail: string,
    note: string,
    groupsno: number,
    groupname: string,
    permit: string[],
    logintime: string,
    status: number
}