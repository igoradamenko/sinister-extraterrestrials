export default function Button(props) {
  return (
    <button
      className={b('button', props)}
      type={props.mods.type}
    >
      <span className="button__text">
        {props.children}
      </span>
    </button>
  );
}

Button.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['button', 'submit']).isRequired,
    view: PropTypes.oneOf(['standard', 'pseudo-link']).isRequired,
  }).isRequired,
  children: PropTypes.node,
};
