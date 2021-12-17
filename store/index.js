// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false,
  isLoading: false,
  popupType: { type: '', title: '請設定查詢作業標題', editId: {} },
  editCompensateEventID: '',
  compensateData: {},
  mouseEventMin: 0,
  userInfo: {},
  editAccount: '',
  canvasUrl: '',
  oriFormData: { slogan: '', content: '', link: '', rows: '' }
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
  TOGGLE_LOADING_STATUS (state) {
    state.isLoading = !state.isLoading;
  },
  TOGGLE_POPUP_TYPE (state, payload) {
    state.popupType.title = payload.title;
    state.popupType.type = payload.type;
    if (payload.editId) {
      state.popupType.editId = payload.editId;
    } else {
      state.popupType.editId = undefined;
    }
  },
  SET_COMPENSATE_DATA (state, payload) {
    state.compensateData = payload;
  },
  SET_COMPENSATE_EVENT_ID (state, payload) {
    state.editCompensateEventID = payload;
  },
  SET_LOUOUT_COUNTDOWN (state, payload) {
    state.mouseEventMin = payload.min;
  },
  SET_USER_INFO (state, payload) {
    state.userInfo = payload.userInfo;
  },
  SET_EDIT_ACCOUNT (state, payload) {
    state.editAccount = payload.userId;
  },
  // SET_LOGOUT_MIN (state, payload) {
  //   state.setMin = payload.setMin;
  // }

  // * 截圖dataUrl
  GET_DATA_URL (state, payload) {
    state.canvasUrl = payload;
  },
  SET_FORM_DATA (state, payload) {
    state.oriFormData = payload;
  }

};
