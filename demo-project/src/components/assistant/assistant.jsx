export default function Assistant(props) {
  return (
    <div className={b('assistant', props)}>
      {/* TODO: a11y; also optimize */}
      <img src={require('./assistant.png')} alt="" className="assistant__logo"/>
      
      <div className="assistant__message">
        <div className="assistant__balloon">
          {/* TODO: move to params? */}
          <p>Hey kid!</p>
          <p>Hope you haven't forgotten the password you set back then in Avengers tower!</p>
        </div>
      </div>
    </div>
  );
}
