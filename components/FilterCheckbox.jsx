import { useCallback, useState } from 'react';
import styles from 'styles/Home.module.scss';

const FilterCheckbox = ({ checked = false, color }) => {
  const [check, setCheck] = useState(checked);

  const handleChange = useCallback((e) => {
    setCheck(e.target.checked);
  });

  const style = { color, 'border-color': color, backgroundColor: check ? color : 'transparent' };

  return (
    <div className={styles.filter} style={style}>
      <input type="checkbox" name="" id="" checked={check} onChange={handleChange} />
      <svg className={styles.checkmark} aria-hidden="true" focusable="false" viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
        />
      </svg>
    </div>
  );
};

export default FilterCheckbox;
