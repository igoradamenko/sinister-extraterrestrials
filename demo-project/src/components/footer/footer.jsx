import ServiceName from 'components/service-name';

export default function Footer(props) {
  return (
    <footer className={b('footer', props)}>
      <ServiceName/>
    </footer>
  );
}
