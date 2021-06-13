export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    const { mods = {} } = props;

    this.state = {
      type: mods.type,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordSwitch = this.handlePasswordSwitch.bind(this);
  }

  componentDidMount() {
    if (this.props.onForwardRef) {
      this.props.onForwardRef(this.inputNode);
    }
  }

  handleChange({ target: { value } }) {
    this.props.onChange(value);
  }

  handlePasswordSwitch() {
    this.setState(
      prevState => ({
        type: prevState.type === 'password' ? 'text' : 'password',
      }), 
      () => {
        this.inputNode.focus();
        
        const caretPosition = this.inputNode.value.length;
        this.inputNode.setSelectionRange(caretPosition, caretPosition);
      },
    );
  }

  render() {
    const {
      mods = {},
      value,
      autoFocus,
      id,
      name,
    } = this.props;

    const { type } = this.state;

    const initialType = mods.type;

    const autoComplete = initialType !== 'password' ? 'on' : 'off';
    const autoCorrect = initialType !== 'password' ? 'on' : 'off';
    const isFilled = value.length > 0;

    return (
      <div
        className={b('input', this.props)}
      >
        <input
          className="input__field"
          id={id}
          name={name}
          ref={r => this.inputNode = r}
          disabled={mods.disabled}
          value={value}
          type={this.state.type}
          autoFocus={autoFocus}
          onChange={this.handleChange}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
        />

        {initialType === 'password' && isFilled && !mods.disabled && (
          <button
            type="button"
            className="input__password-switcher"
            onClick={this.handlePasswordSwitch}
          >
            {type === 'password' || mods.disabled ? 'Show' : 'Hide'}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mods: PropTypes.shape({
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['email', 'password']).isRequired,
  }).isRequired,
  autoFocus: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
