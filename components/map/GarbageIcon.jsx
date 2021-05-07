import styles from 'styles/GarbageIcon.module.css';

const GarbageIcon = ({ color, text }) => {
  const clusterPath = (
    <path
      fill={color}
      stroke="#000000"
      strokeWidth="10"
      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
    />
  );

  const pointPath = (
    <path
      fill={color}
      stroke="#000000"
      strokeWidth="10"
      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
    />
  );

  return (
    <div className={styles.container}>
      <svg
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="trash"
        className="svg-inline--fa fa-trash fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        {text ? clusterPath : pointPath}
      </svg>
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
};

export default GarbageIcon;
