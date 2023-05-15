import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from './pages/Contact';
import Login from './pages/Login';
import Publications from './pages/Publications';
import Historique from './pages/Historique';
import Services from './pages/Services';

import CaeDemandes from './application/cae/CaeDemandes';
import ListeDemandes from './application/cae/listDemandes';
import ListePrincipale from './application/cae/ListePrincipale';
import ListeAttente from './application/cae/ListeAttente';
import Indisciplines from './application/cae/Indisciplines';

import ChangeRoom from './application/aa/ChangeRoom';
import ValiderLog from './application/aa/ValiderLog';
import AaAccueil from './application/aa/AaAccueil';
import DeleteEtud from './application/aa/DeleteEtud';

import DirAccueil from './application/directeur/DirAccueil';
import Annonces from './application/directeur/Annonces';
import DirStats from './application/directeur/DirStats';
import Accounts from './application/directeur/Accounts';
import Discipline from './application/directeur/Discipline';


function App() {
  const isAuthenticated = localStorage.getItem('authentificated');
  const typeUser = localStorage.getItem('typeUser');

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/publications" element={<Publications />} />
          <Route exact path="/historique" element={<Historique />} />
          <Route exact path="/services" element={<Services />} />


          <Route  path="/admin/cae/accueil" element={isAuthenticated && typeUser === "cae" ? <CaeDemandes /> : <Navigate to="/login" />}  />
          <Route  path="/admin/cae/demandes" element={isAuthenticated && typeUser === "cae" ? <ListeDemandes /> : <Navigate to="/login" />}  />
          <Route  path="/admin/cae/listP" element={isAuthenticated && typeUser === "cae" ?<ListePrincipale /> : <Navigate to="/login" />}  />
          <Route  path="/admin/cae/listA" element={isAuthenticated && typeUser === "cae" ?<ListeAttente /> : <Navigate to="/login" />}  />
          <Route  path="/admin/cae/indiscipline" element={isAuthenticated && typeUser === "cae" ?<Indisciplines /> : <Navigate to="/login" />}  />

          <Route  path="/admin/aa/accueil" element={isAuthenticated && typeUser === "aa" ?<AaAccueil /> : <Navigate to="/login" />}/>
          <Route  path="/admin/aa/valider" element={isAuthenticated && typeUser === "aa" ?<ValiderLog /> : <Navigate to="/login" />} />
          <Route  path="/admin/aa/chambres" element={isAuthenticated && typeUser === "aa" ?<ChangeRoom /> : <Navigate to="/login" />} />
          <Route  path="/admin/aa/deleteEtud" element={isAuthenticated && typeUser === "aa" ?<DeleteEtud /> : <Navigate to="/login" />} />

          <Route  path="/admin/dir/accueil" element={isAuthenticated && typeUser === "dir" ?<DirAccueil /> : <Navigate to="/login" />} />
          <Route  path="/admin/dir/annonces" element={isAuthenticated && typeUser === "dir" ?<Annonces /> : <Navigate to="/login" />} />
          <Route  path="/admin/dir/comptes"  element={isAuthenticated && typeUser === "dir" ?<Accounts /> : <Navigate to="/login" />} />
          <Route  path="/admin/dir/stats" element={isAuthenticated && typeUser === "dir" ?<DirStats /> : <Navigate to="/login" />} />
          <Route  path="/admin/dir/discipline"element={isAuthenticated && typeUser === "dir" ?<Discipline /> : <Navigate to="/login" />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;