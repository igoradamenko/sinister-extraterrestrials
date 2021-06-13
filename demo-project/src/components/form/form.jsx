export default function Form(props) {
  return (
    <form
      className="form"
      onSubmit={props.onSubmit}
    >{props.children}</form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};
