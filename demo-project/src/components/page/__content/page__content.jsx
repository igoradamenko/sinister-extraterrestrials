export default function Page__Content(props) {
  return (
    <main className="page__content">
      {props.children}
    </main>
  );
}

Page__Content.propTypes = {
  children: PropTypes.node,
};
