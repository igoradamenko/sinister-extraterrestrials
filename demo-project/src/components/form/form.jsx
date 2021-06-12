export default function Form(props) {
  return (
    <form className="form">{props.children}</form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
};
