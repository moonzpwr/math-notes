import { Dialog, DialogTitle } from '@mui/material';

interface Props {
	isOpen: boolean;
	handleClose: () => void;
}

export const GlobalSearch: React.FC<Props> = ({ isOpen, handleClose }) => {
	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>Set backup account</DialogTitle>
		</Dialog>
	);
};
