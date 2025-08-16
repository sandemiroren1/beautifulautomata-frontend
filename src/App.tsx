
import { BrowserRouter, Route, Routes } from "react-router";
import  { CreateAutomata } from "./pages/create-automata-page";
import { Welcome } from "./pages/welcome";
import { CreatePuzzle } from "./pages/create-puzzle";
export default function App() {

  return (<BrowserRouter>
  <Routes>
    <Route path = {"/"} element = {<Welcome/>}></Route>
    <Route path = {"/create"} element = {<CreatePuzzle/>}></Route>
    <Route path = {"/solve"} element = {<CreateAutomata/>}></Route>

  </Routes>
  </BrowserRouter>);
}