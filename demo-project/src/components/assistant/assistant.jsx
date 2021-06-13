export default function Assistant(props) {
  const type = props.mods.type;

  if (type === 'success') {
    return (
      <div className={b('assistant', props)}>
        <img
          src={require('./_type/_success/assistant_type_success.png')}
          srcSet={`${require('./_type/_success/assistant_type_success.png')} 1x, ${require('./_type/_success/assistant_type_success@2x.png')} 2x`}
          alt="Winking Tony Stark"
          className="assistant__logo"
        />
      </div>
    );
  }

  if (type === 'greeting' || type === 'password-reset') {
    const photoSrc = type === 'greeting' 
      ? require('./_type/_greeting/assistant_type_greeting.png')
      : require('./_type/_password-reset/assistant_type_password-reset.png');

    const photoSrc2x = type === 'greeting' 
      ? require('./_type/_greeting/assistant_type_greeting@2x.png')
      : require('./_type/_password-reset/assistant_type_password-reset@2x.png');

    const photoDesc = type === 'greeting'
      ? 'Smiling Tony Stark'
      : 'Rolling eyes Tony Stark';

    return (
      <div className={b('assistant', props)}>
        <div className="assistant__message">
          <img 
            src={photoSrc} 
            srcSet={`${photoSrc} 1x, ${photoSrc2x} 2x`}
            alt={photoDesc}
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
