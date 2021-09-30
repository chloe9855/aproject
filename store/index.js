// * ==========================================================================
// * State
// * ==========================================================================

export const state = () => ({
  hideFooter: false,
  popupState: false
});

// * ==========================================================================
// * Mutations
// * ==========================================================================

export const mutations = {
  // * 隱藏FOOTER
  HIDE_FOOTER_CTRL (state, payload) {
    state.hideFooter = payload;
  },
  TOGGLE_ACCOUNT_POPUP (state) {
    state.popupState = !state.popupState;
  }
};
