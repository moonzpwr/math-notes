import styles from './Header.module.css';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@/enums/Paths';
import { authStore } from '@/Store/Auth.store';
import { observer } from 'mobx-react-lite';
import { notificationsStore } from '@/Store/Notifications.store';
import { useEffect, useState } from 'react';
import { projectsStore } from '@/Store/Projects.store';
import { structureStore } from '@/Store/Structure.store';
import { recursiveSearchInStructure } from '@/helpers/recursiveSearchInStructure';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';

export const Header: React.FC = observer(() => {
	const currentUser = useAuth();
	const navigate = useNavigate();
	const { logout } = authStore;
	const { showNotification } = notificationsStore;
	const { projects } = projectsStore;
	const { structure } = structureStore;
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		const projectId = pathname.split('/')[2];
		const notebookId = pathname.split('/')[3];
		if (projectId) {
			const projectName = projects.data?.find((p) => p.id === projectId)?.name;
			setSelectedProject(projectName || null);
		}
		if (notebookId) {
			const notebookName = recursiveSearchInStructure(structure, notebookId);
			setSelectedNotebook(notebookName || null);
		}
	}, [pathname]);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			const keys = ['Control', 'k'];
			const pressedKeys = new Set();

			if (event.ctrlKey) pressedKeys.add('Control');
			pressedKeys.add(event.key);

			const allMatch = keys.every((key) => pressedKeys.has(key));

			if (allMatch) {
				event.preventDefault();
				setIsSearchOpen(true);
			}
		};

		window.addEventListener('keydown', handler);
		return () => {
			window.removeEventListener('keydown', handler);
		};
	}, []);

	const handleClose = () => {
		setIsSearchOpen(false);
	};

	return (
		<div className={styles.headerRoot}>
			<div className={styles.navContainer}>
				<h1 className={styles.logo} onClick={() => navigate(Paths.Home)}>
					G.Nest
				</h1>
				{selectedProject && <div>/ {selectedProject}</div>}
				{selectedNotebook && <div>/ {selectedNotebook}</div>}
			</div>
			<div className={styles.btnContainer}>
				{!currentUser ? (
					<>
						<Button onClick={() => navigate(Paths.Login)}>LOGIN</Button>
						<Button onClick={() => navigate(Paths.Registration)}>REGISTRATION</Button>
					</>
				) : (
					<>
						<div className={styles.searchContainer} onClick={() => setIsSearchOpen(true)}>
							<SearchIcon color='primary' />
							Search...
							<div className={styles.searchButton}>Ctrl+K</div>
						</div>
						<Button onClick={logout}>LOGOUT</Button>
						<Button onClick={() => navigate('editor')}>EDITOR</Button>
						<Button onClick={() => showNotification('Hello')}>Say Hi!</Button>
					</>
				)}
			</div>
			<GlobalSearch isOpen={isSearchOpen} handleClose={handleClose} />
		</div>
	);
});
