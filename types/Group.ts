/**
 * 群組資訊
 */
export interface Group {
    /** Group表單的管理處代碼(Ia)*/
    ia: string,
    /**Ia表單的管理處名稱(Ia_cns) */
    ianame: string
    /**Group表單的群組序號(Group_sno) */
    groupsno : number, 
    /**Group表單的群組名稱(Name) */
    groupname: string,
    /**Permit表單的權限編號(Permit_id) */
    permit: string[],
    /**Group表單的建立時間(Create_time) */
    createtime: string,
    /**Group表單的更新時間 */
    updatetime: string
}