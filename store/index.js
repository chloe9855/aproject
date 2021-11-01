// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false,
  popupType: { type: 'editAccount', title: '請設定查詢作業標題' },
  mouseEventMin: 0
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
  },
  SET_LOUOUT_COUNTDOWN (state, payload) {
    state.mouseEventMin = payload.min;
  }
};
