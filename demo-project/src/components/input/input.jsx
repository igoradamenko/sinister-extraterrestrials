export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    const {
      mods = {},
      value,
    } = props;

    this.state = {
      filled: !!value,
      focused: props.autoFocus,
      type: mods.type,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordSwitch = this.handlePasswordSwitch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { value = '' } = this.props;

    if (value !== prevProps.value) {
      this.setState({
        filled: !!value,
      });
    }
  }

  handleChange({ target: { value } }) {
    const { mods = {}, onChange } = this.props;

    this.setState({
      filled: !!value,
    });

    onChange(value);
  }

  handlePasswordSwitch() {
    this.setState(prevState => ({
      ...prevState,
      type: prevState.type === 'password' ? 'text' : 'password',
    }));
  }

  render() {
    const {
      error,
      maxLength,
      mods = {},
      value,
      autoFocus,
    } = this.props;

    const { focused, filled, type } = this.state;

    const defaultMods = {
      focused,
      filled,
    };

    const initialType = mods.type;

    const autoComplete = initialType !== 'password' ? 'on' : 'off';
    const autoCorrect = initialType !== 'password' ? 'on' : 'off';

    return (
      <div
        className={b('input', this.props, defaultMods)}
      >
        <input
          className="input__field"
          value={value}
          type={this.state.type}
          autoFocus={autoFocus}
          onChange={this.handleChange}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
        />

        {initialType === 'password' && (
          // TODO: a11y
          <button
            type="button"
            className="input__password-switcher"
            onClick={this.handlePasswordSwitch}
          >
            {type === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
    );
  }
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['email', 'password']).isRequired,
  }).isRequired,
  autoFocus: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
