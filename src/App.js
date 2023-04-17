import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProceduresPage from "./pages/ProceduresPage/ProceduresPage";
import ChatPdPage from "./pages/ChatPdPage/ChatPdPage";
import TicketPdPage from "./pages/TicketPdPage/TicketPdPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/chatPd'} element={<ChatPdPage/>}/>
        <Route path={'/ticketPd'} element={<TicketPdPage/>}/>
        <Route path={'/procedures'} element={<ProceduresPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
