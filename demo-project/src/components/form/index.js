export { default } from './form';

export { default as Form__Field } from './__field/form__field';
export { default as Form__Label } from './__label/form__label';

require('./form.scss');

require('./__action/form__action.scss');
require('./__assistant/form__assistant.scss');

require('./__field/form__field.scss');
require('./__field/_error/form__field_error.scss');

require('./__label/form__label.scss');
