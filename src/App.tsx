
import { BrowserRouter, Route, Routes } from "react-router";
import AutomataFlow from "./components/AutomataFlow";
import  { Create } from "./pages/create-page";
import { Welcome } from "./pages/welcome";
export default function App() {

  return (<BrowserRouter>
  <Routes>
    <Route path = {"/"} element = {<Welcome/>}></Route>
    <Route path = {"/create"} element = {<Create/>}></Route>

  </Routes>
  </BrowserRouter>);
}