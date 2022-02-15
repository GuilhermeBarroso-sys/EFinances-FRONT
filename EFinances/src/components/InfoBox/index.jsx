import styles from './styles.module.scss';

export default function InfoBox() {
	return (
		<div className = {styles.box}>
			<header>
				<p>Entradas</p>
				
			</header>
			<strong>R$ 17.400,00</strong>
		</div>
	);
}