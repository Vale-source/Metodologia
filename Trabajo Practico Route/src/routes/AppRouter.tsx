import { Route, Routes } from "react-router";
import { CursosScreen } from "../components/screens/CursosScreen/CursosScreen";
import { EstudiantesScreen } from "../components/screens/EstudiantesScreen/EstudiantesScreen";

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<CursosScreen />} />
            <Route path="/curso/:id" element={<EstudiantesScreen />} />
            <Route path="/curso/" element={<EstudiantesScreen />} />
		</Routes>
	);
};