import styles from './styles.module.scss';
export default function Box({children}) {
	return (
		<div className={styles.container}>

			<div className= {styles.flex}>{children}</div>
		</div>
	);
}