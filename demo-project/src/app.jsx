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

document.body.addEventListener('transitionend', onBodyTransitionEnd, { once: true });

document.body.classList.add('root_inited');

setViewportHeightVariable();
window.addEventListener('resize', setViewportHeightVariable);

function setViewportHeightVariable() {
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

function onBodyTransitionEnd() {
  document.getElementById('global-preloader').remove();
}
