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
    this.setState({ email });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ isLoading: true, isError: false });

    const res = await postAuth({ email, password })

    switch (res.status) {
      case STATUS.OK: 
        this.setState({ isLoading: false, isLoggedIn: true });
        break;

      // TODO: add some hints on too many errors?
      case STATUS.WRONG_CREDENTIALS:
        this.setState({ isLoading: false, isError: true });
        break;

      default:
        throw new Error('Unknown postAuth status');
    }
  }

  render() {
    const { email, password, isLoading, isError } = this.state;

    const isEmpty = !email || !password;

    return (
    // TODO: add face id login
    <Form onSubmit={this.handleSubmit}>
      <Assistant mix="form__assistant"/>

      <Form__Field mods={{ error: isError }}>
        {/* TODO: check autocomplete! */}
        <Form__Label for="email-field">E-mail:</Form__Label>
        
        <Input
          mods={{ type: 'email', disabled: isLoading }}
          mix="form__input"
          id="email-field"
          name="email"
          value={email}
          onChange={this.handleEmailChange}
          autoFocus
        />
      </Form__Field>
      
      <Form__Field mods={{ error: isError }}>
        <Form__Label for="password-field">Password:</Form__Label>
        
        <Input
          mods={{ type: 'password', disabled: isLoading }}
          mix="form__input"
          id="password-field"
          name="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
      </Form__Field>

      <Form__Field>
        <Button
          mods={{ type: 'submit', view: 'standard', disabled: isEmpty, loading: isLoading }}
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
