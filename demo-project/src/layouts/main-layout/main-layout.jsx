import Footer from 'components/footer';

export default function MainLayout(props) {
  return (
    <>
      {props.children}
      <Footer/>
    </>
  );
}