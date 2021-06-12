export default function Page(props) {
  return (
    <div className="page">
      {props.children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node,
};
