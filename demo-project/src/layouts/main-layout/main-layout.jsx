import Footer from 'components/footer';
import Page, { Page__Content } from 'components/page';

export default function MainLayout(props) {
  return (
    <Page>
      <Page__Content>
        {props.children}
      </Page__Content>
      <Footer mix="page__footer"/>
    </Page>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
