import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes/AppRouter.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AppRouter />
	</BrowserRouter>
)
