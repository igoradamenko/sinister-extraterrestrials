import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';

import MainLayout from 'layouts/main-layout';

import LoginView from 'views/login-view';

require('components/root');

const ROOT_NODE = document.getElementById('app');

const App = hot(() => (
  <MainLayout>
    <LoginView/>
  </MainLayout>
));

ReactDOM.render(<App/>, ROOT_NODE);

document.body.classList.add('root_inited');
