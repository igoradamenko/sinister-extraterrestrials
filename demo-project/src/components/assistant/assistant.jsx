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
          
          {type === 'greeting' && (
            <>
              <p>Hey kid!</p>
              <p>Hope you haven&rsquo;t forgotten the password you set back then in&nbsp;Avengers tower!</p>
            </>
          )}

          {type === 'password-reset' && (
            <>
              <p>Well, that&rsquo;s pretty.</p>
              <p>I&rsquo;m giving full access to&nbsp;the system that may kill everyone on&nbsp;Earth to&nbsp;the boy who can&rsquo;t even remember his own password. Nice!</p>
            </>
          )}
        </div>
      </div>
    );
  }

  throw new Error('Unknown Assistant type');
}

// TODO: check proptypes
Assistant.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['greeting', 'success', 'password-reset']).isRequired,
  }).isRequired,
};
