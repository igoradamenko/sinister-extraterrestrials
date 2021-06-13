/* eslint-disable react/button-has-type */
/* see: https://github.com/yannickcr/eslint-plugin-react/issues/1555 */

export default function Button(props) {
  return (
    <button
      className={b('button', props)}
      type={props.mods.type}
      disabled={props.mods.disabled}
      onClick={props.onClick}
    >
      <span className="button__text">
        {props.children}
      </span>
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  mods: PropTypes.shape({
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit']).isRequired,
    view: PropTypes.oneOf(['standard', 'pseudo-link']).isRequired,
  }).isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
