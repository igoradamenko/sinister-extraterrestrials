export default function Input(props) {
  return (
    <input
      className={b('input', props)}
      type={props.mods.type}
    />
  );
}

Input.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['email', 'password']).isRequired,
  }).isRequired,
};
