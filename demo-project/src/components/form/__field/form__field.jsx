export default function Form__Field(props) {
  return (
    <div className={b('form__field', props)}>{props.children}</div>
  );
}

Form__Field.propTypes = {
  mods: PropTypes.shape({
    error: PropTypes.bool,
  }),
  children: PropTypes.node,
};
