export default function Assistant(props) {
  const type = props.mods.type;

  if (type === 'success') {
    return (
      <div className={b('assistant', props)}>
        {/* TODO: a11y; also optimize */}
        <img src={require('./_type/_success/assistant_type_success.png')} alt="" className="assistant__logo"/>
      </div>
    );
  }

  if (type === 'greeting' || type === 'password-reset') {
    const photoSrc = type === 'greeting' 
      ? require('./_type/_greeting/assistant_type_greeting.png')
      : require('./_type/_password-reset/assistant_type_password-reset.png')

    return (
      <div className={b('assistant', props)}>
        <div className="assistant__message">
          {/* TODO: a11y; also optimize */}
          <img 
            src={photoSrc} 
            alt="" 
            className="assistant__logo"
          />
          
          {/* TODO: typograf */}
          {type === 'greeting' && (
            <>
              <p>Hey kid!</p>
              <p>Hope you haven't forgotten the password you set back then in Avengers tower!</p>
            </>
          )}

          {type === 'password-reset' && (
            <>
              <p>Well, that's pretty.</p>
              <p>I'm giving full access to the system that may kill everyone on Earth to the boy who can't even remember his own password. Nice!</p>
            </>
          )}
          
        </div>
      </div>
    );
  }

  throw new Error('Unknown Assistant type');
}

Assistant.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['greeting', 'success', 'password-reset']).isRequired,
  }).isRequired,
};
