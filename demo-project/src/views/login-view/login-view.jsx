import Assistant from 'components/assistant';
import Button from 'components/button';
import Form, { Form__Field, Form__Label } from 'components/form';
import Input from 'components/input';

import { STATUS, postAuth } from 'services/fetcher';

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isLoggedIn: false,
      isError: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(email) {
    this.setState({ email, isError: false });
  }

  handlePasswordChange(password) {
    this.setState({ password, isError: false });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ isLoading: true });

    postAuth({ email, password })
      .then(() => this.setState({ isLoading: false, isLoggedIn: true }))
      .catch(() => this.setState({ isLoading: false, isError: true }));
  }

  render() {
    const { email, password, isLoading } = this.state;

    return (
    // TODO: add face id login
    // TODO: errors!
    <Form onSubmit={this.handleSubmit}>
      <Assistant mix="form__assistant"/>

      <Form__Field>
        {/* TODO: autofocus; also check autocomplete! */}
        <Form__Label>E-mail:</Form__Label>
        
        <Input
          mods={{ type: 'email', disabled: isLoading }}
          mix="form__input"
          value={email}
          onChange={this.handleEmailChange}
        />
      </Form__Field>
      
      <Form__Field>
        {/* TODO: connect label and input */}
        <Form__Label>Password:</Form__Label>
        
        {/* TODO: add a way to make password visible */}
        <Input
          mods={{ type: 'password', disabled: isLoading }}
          mix="form__input" 
          value={password}
          onChange={this.handlePasswordChange}
        />
      </Form__Field>

      <Form__Field>
        {/* TODO: block if not all the fields are filled */}
        <Button
          mods={{ type: 'submit', view: 'standard', loading: isLoading }}
          mix="form__action"
        >Sign in</Button>
        
        <Button
          mods={{ type: 'button', view: 'pseudo-link', disabled: isLoading }}
          mix="form__action"
        >Reset password</Button>
      </Form__Field>
    </Form>
  );
  }
}
