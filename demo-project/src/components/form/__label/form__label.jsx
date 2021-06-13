export default function Form__Label(props) {
  return (
    <label
      className="form__label"
      htmlFor={props.for}
    >{props.children}</label>
  );
}

Form__Label.propTypes = {
  for: PropTypes.string.isRequired,
  children: PropTypes.node,
};
