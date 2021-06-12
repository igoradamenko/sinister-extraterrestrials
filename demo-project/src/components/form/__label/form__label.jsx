export default function Form__Label(props) {
  return (
    <label className="form__label">{props.children}</label>
  );
}

Form__Label.propTypes = {
  children: PropTypes.node,
};
