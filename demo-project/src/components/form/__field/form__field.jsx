export default function Form__Field(props) {
  return (
    <div className="form__field">{props.children}</div>
  );
}

Form__Field.propTypes = {
  children: PropTypes.node,
};
