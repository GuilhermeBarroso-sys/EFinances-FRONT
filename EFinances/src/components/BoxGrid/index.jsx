import styles from './styles.module.scss';
export default function BoxGrid({repeatCount, children}) {
	return (
		<div className= {styles.grid} style = {{
			gridTemplateColumns: `repeat(${repeatCount}, 1fr)`
		}}>
			{children}
		</div>
	);
}