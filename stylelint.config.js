module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'no-descending-specificity': null,
    'no-empty-source': null
  }
};
