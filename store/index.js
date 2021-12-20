// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false,
  isLoading: false,
  popupType: { type: '', title: '請設定查詢作業標題', editId: {} },
  mouseEventMin: 0,
  userInfo: {},
  editAccount: '',
  canvasUrl: '',
  oriFormData: { slogan: '', content: '', link: '', rows: '' },

  // 這看起來很糟糕，但現在的popup架構也沒辦法直接 emit 事件
  refetchCounter: 0
});

// * ==========================================================================
// * Mutations
// * ==========================================================================

export const SET_RE_FETCH_DATA = 'SET_RE_FETCH_DATA';
export const TOGGLE_POPUP_STATUS = 'TOGGLE_POPUP_STATUS';

export const mutations = {
  // * 隱藏FOOTER
  HIDE_FOOTER_CTRL (state, payload) {
    state.hideFooter = payload;
  },
  [TOGGLE_POPUP_STATUS] (state) {
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
    state.popupType.integrateSubmit = payload.integrateSubmit == null
      ? true
      : payload.integrateSubmit;
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
  },
  [SET_RE_FETCH_DATA] (state) {
    state.refetchCounter++;
  }
};
