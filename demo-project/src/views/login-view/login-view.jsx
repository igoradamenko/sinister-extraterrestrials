import Assistant from 'components/assistant';
import Button from 'components/button';
import Form, { Form__Field, Form__Label } from 'components/form';
import Input from 'components/input';

export default function LoginView(props) {
  return (
    // TODO: add face id login
    <Form>
      <Assistant mix="form__assistant"/>

      <Form__Field>
        <Form__Label>E-mail:</Form__Label>
        <Input mods={{ type: 'email' }} mix="form__input" />
      </Form__Field>
      
      <Form__Field>
        <Form__Label>Password:</Form__Label>
        {/* TODO: add a way to make password visible */}
        <Input mods={{ type: 'password' }} mix="form__input" />
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

LoginView.propTypes = {
};
