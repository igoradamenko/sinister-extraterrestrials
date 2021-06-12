import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';

import MainLayout from 'layouts/main-layout';

require('components/root');

const ROOT_NODE = document.getElementById('app');

const App = hot(() => (
  <MainLayout/>
));

ReactDOM.render(<App/>, ROOT_NODE);

document.body.classList.add('root_inited');
