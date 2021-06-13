export default function Assistant(props) {
  const type = props.mods.type;

  if (type === 'greeting') {
    return (
      <div className={b('assistant', props)}>
        {/* TODO: a11y; also optimize */}
        <img src={require('./_type/_greeting/assistant_type_greeting.png')} alt="" className="assistant__logo"/>
        
        <p>Hey kid!</p>
        <p>Hope you haven't forgotten the password you set back then in Avengers tower!</p>
      </div>
    );
  }

  if (type === 'success') {
    return (
      <div className={b('assistant', props)}>
        {/* TODO: a11y; also optimize */}
        <img src={require('./_type/_success/assistant_type_success.png')} alt="" className="assistant__logo"/>
      </div>
    );
  }

  throw new Error('Unknown Assistant type');
}

Assistant.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['greeting', 'success']).isRequired,
  }).isRequired,
};
