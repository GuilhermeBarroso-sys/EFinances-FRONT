import Modal from 'react-modal';
export default function ReactModal({modalIsOpen, setModalIsOpen, children, customStyles = {content: {
	width: '70%',
	height: '70%',
	top: '50%',
	left: '50%',
	right: 'auto',
	bottom: 'auto',
	marginRight: '-50%',
	transform: 'translate(-50%, -50%)',
},}}) {
	return (
	
		<Modal
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={() => {setModalIsOpen(false);}}
			style={customStyles}
			contentLabel="Example Modal"
		> 
			{children} 
		</Modal>

	);
}