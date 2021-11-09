// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false,
  popupType: { type: 'editAccount', title: '請設定查詢作業標題', editId: {} },
  mouseEventMin: 0,
  userInfo: {},
  editAccount: ''
});

// * ==========================================================================
// * Mutations
// * ==========================================================================

export const mutations = {
  // * 隱藏FOOTER
  HIDE_FOOTER_CTRL (state, payload) {
    state.hideFooter = payload;
  },
  TOGGLE_POPUP_STATUS (state) {
    state.popupState = !state.popupState;
  },
  TOGGLE_POPUP_TYPE (state, payload) {
    state.popupType.title = payload.title;
    state.popupType.type = payload.type;
    if (payload.editId) {
      state.popupType.editId = payload.editId;
    }
  },
  SET_LOUOUT_COUNTDOWN (state, payload) {
    state.mouseEventMin = payload.min;
  },
  SET_USER_INFO (state, payload) {
    state.userInfo = payload.userInfo;
  },
  SET_EDIT_ACCOUNT (state, payload) {
    state.editAccount = payload.userId;
  }
};
