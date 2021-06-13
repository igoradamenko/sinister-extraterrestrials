import Assistant from 'components/assistant';
import Button from 'components/button';
import Form, { Form__Field, Form__Label } from 'components/form';
import Input from 'components/input';

import { STATUS, postAuth, resetPassword } from 'services/fetcher';

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isLoggedIn: false,
      isError: false,
      isResetting: false,
      isReset: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleEmailChange(email) {
    this.setState({ email });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  handleResetClick() {
    this.setState(prevState => ({ isResetting: !prevState.isResetting }));
    this.emailInputNode.focus();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.isResetting) {
      await this.resetPassword();
    } else {
      await this.auth();
    }
  }

  async auth() {
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

  async resetPassword() {
    const { email } = this.state;

    this.setState({ isLoading: true, isError: false });

    const res = await resetPassword({ email });

    this.setState({
      isLoading: false,
      isError: false,
      isResetting: false,
      isReset: true,
    });
  }

  render() {
    const {
      email,
      password,
      isLoading,
      isError,
      isLoggedIn,
      isResetting,
      isReset,
    } = this.state;

    if (isLoggedIn || isReset) {
      return (
        <Assistant
          mods={{ type: 'success' }}
        />
      );
    }

    const isEmpty = isResetting ? !email : (!email || !password);

    return (
      <Form onSubmit={this.handleSubmit}>
        <Assistant
          mods={{ type: isResetting ? 'password-reset' : 'greeting' }}
          mix="form__assistant"
        />

        <Form__Field mods={{ error: isError }}>
          {/* TODO: check autocomplete! */}
          <Form__Label for="email-field">E-mail:</Form__Label>
          
          <Input
            mods={{ type: 'email', disabled: isLoading }}
            mix="form__input"
            id="email-field"
            name="email"
            value={email}
            onForwardRef={r => this.emailInputNode = r}
            onChange={this.handleEmailChange}
            autoFocus
          />
        </Form__Field>
        
        {!isResetting && (
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
        )}

        <Form__Field>
          <Button
            mods={{ type: 'submit', view: 'standard', disabled: isEmpty, loading: isLoading }}
            mix="form__action"
          >
            {isResetting ? 'Reset password' : 'Sign in'}
          </Button>
          
          <Button
            mods={{ type: 'button', view: 'pseudo-link', disabled: isLoading }}
            mix="form__action"
            onClick={this.handleResetClick}
          >
            {isResetting ? 'Sign in' : 'Reset password'}
          </Button>
        </Form__Field>
      </Form>
    );
  }
}
