// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false,
  popupType: 'editAccount'
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
    state.popupType = payload.type;
  }
};
