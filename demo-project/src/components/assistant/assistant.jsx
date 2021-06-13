const DATA_BY_TYPE = {
  success: {
    photoDescription: 'Winking Tony Stark',
    photoSrc1x: require('./_type/_success/assistant_type_success.png'),
    photoSrc2x: require('./_type/_success/assistant_type_success@2x.png'),
  },
  greeting: {
    photoDescription: 'Smiling Tony Stark',
    photoSrc1x: require('./_type/_greeting/assistant_type_greeting.png'),
    photoSrc2x: require('./_type/_greeting/assistant_type_greeting@2x.png'),
    text: (
      <>
        <p>Hey kid!</p>
        <p>Hope you haven&rsquo;t forgotten the password you set back then in&nbsp;Avengers tower!</p>
      </>
    ),
  },
  'password-reset': {
    photoDescription: 'Rolling eyes Tony Stark',
    photoSrc1x: require('./_type/_password-reset/assistant_type_password-reset.png'),
    photoSrc2x: require('./_type/_password-reset/assistant_type_password-reset@2x.png'),
    text: (
      <>
        <p>Well, that&rsquo;s pretty.</p>
        <p>I&rsquo;m giving full access to&nbsp;the system that may kill everyone on&nbsp;Earth to&nbsp;the boy who can&rsquo;t even remember his own password. Nice!</p>
      </>
    ),
  },
};

function getSrcSet(data) {
  return `${data.photoSrc1x} 1x, ${data.photoSrc2x} 2x`;
}

export default function Assistant(props) {
  const type = props.mods.type;
  const data = DATA_BY_TYPE[type];

  if (!data) {
    throw new Error('Unknown Assistant type');
  }

  if (type === 'success') {
    return (
      <div className={b('assistant', props)}>
        <img
          src={data.photoSrc1x}
          srcSet={getSrcSet(data)}
          alt={data.photoDescription}
          className="assistant__photo"
        />
      </div>
    );
  }

  return (
    <div className={b('assistant', props)}>
      <div className="assistant__message">
        <img
          src={data.photoSrc1x}
          srcSet={getSrcSet(data)}
          alt={data.photoDescription}
          className="assistant__photo assistant__photo_view_floating"
        />

        {data.text}
      </div>
    </div>
  );
}

Assistant.propTypes = {
  mods: PropTypes.shape({
    type: PropTypes.oneOf(['greeting', 'success', 'password-reset']).isRequired,
  }).isRequired,
};
