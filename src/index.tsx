import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
const title = createRoot(document.getElementById('title')!);
title.render(`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1));