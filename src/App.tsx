import { MathJaxContext } from 'better-react-mathjax';
import { AppRoutes } from './Router/routes';
import { ErrorBoundary } from './Components/ErrorBoundary/ErrorBoundary';
import { ErrorView } from './Views/ErrorView/ErrorView';
import { Header } from './Components/Header/Header';
import { DefaultLayout } from './Components/DefaultLayout/DefaultLayout';

function App() {
	return (
		<MathJaxContext>
			<ErrorBoundary fallback={<ErrorView />}>
				<Header />
				<DefaultLayout>
					<AppRoutes />
				</DefaultLayout>
			</ErrorBoundary>
		</MathJaxContext>
	);
}

export default App;
