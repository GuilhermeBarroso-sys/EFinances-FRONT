import { Store } from "react-notifications-component";


/**
 * 
 * @param {string} title 'Hello world'
 * @param {message} message 'lorem ipsum...'
 * @param {string} type 'default'|'danger'|'success'|'warning'|'info'  
 * 
 * @returns {void}
 */
export function notification(title, message, type) {
	Store.addNotification({
		title: title,
		message: message,
		type: type,
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true
		}
	});
}