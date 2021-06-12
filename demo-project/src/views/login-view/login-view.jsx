import Assistant from 'components/assistant';
import Button from 'components/button';
import Form, { Form__Field, Form__Label } from 'components/form';
import Input from 'components/input';

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(email) {
    this.setState({ email });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  render() {
    const { email, password } = this.state;

    return (
    // TODO: add face id login
    // TODO: errors!
    <Form>
      <Assistant mix="form__assistant"/>

      <Form__Field>
        {/* TODO: autofocus; also check autocomplete! */}
        <Form__Label>E-mail:</Form__Label>
        
        <Input
          mods={{ type: 'email' }}
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
          mods={{ type: 'password' }}
          mix="form__input" 
          value={password}
          onChange={this.handlePasswordChange}
        />
      </Form__Field>

      <Form__Field>
        <Button
          mods={{ type: 'submit', view: 'standard' }}
          mix="form__action"
        >Sign in</Button>
        
        <Button
          mods={{ type: 'button', view: 'pseudo-link' }}
          mix="form__action"
        >Reset password</Button>
      </Form__Field>
    </Form>
  );
  }
}
