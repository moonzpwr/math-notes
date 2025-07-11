import { MathJaxContext } from 'better-react-mathjax';
import { AppRoutes } from './Router/routes';
import { ErrorBoundary } from './Components/ErrorBoundary/ErrorBoundary';
import { ErrorView } from './Views/ErrorView/ErrorView';
import { Header } from './Components/Header/Header';

function App() {
	return (
		<MathJaxContext>
			<ErrorBoundary fallback={<ErrorView />}>
				<Header />
				<AppRoutes />
			</ErrorBoundary>
		</MathJaxContext>
	);
}

export default App;
