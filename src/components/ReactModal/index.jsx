import Modal from 'react-modal';
export default function ReactModal({modalIsOpen, setModalIsOpen, children, customStyles = {content: {
	width: '80%',
	height: '80%',
	top: '50%',
	left: '50%',
	right: 'auto',
	bottom: 'auto',
	transition: '1s',
	opacity: '1',
	marginRight: '-50%',
	transform: 'translate(-50%, -50%)',
},}}) {
	return (
	
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => {setModalIsOpen(false);}}
			style={customStyles}
			ariaHideApp={false}
			contentLabel="Example Modal"
		> 
			{children} 
		</Modal>

	);
}