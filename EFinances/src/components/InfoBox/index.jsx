import styles from './styles.module.scss';

export default function InfoBox({title, icon, body, style = {}, titleColor = false, bodyColor = false}) {
	return (
		<div className = {styles.box} style = {style}>
			<header>
				<p style = { titleColor ? {color: `${titleColor}`} : {}  }>{title}</p>	
				{icon}
			</header>
			<strong  style = { bodyColor ? {color: `${bodyColor}`} : {}  }>{body}</strong>
		</div>
	);
}