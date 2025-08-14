import { NavLink } from "react-router";

import pkg from 'react-katex';
import {NavButton} from '../components/nav-button'
import Header from "~/components/header";
import { AutomataFlow } from "~/components/automata-flow";
const {BlockMath, InlineMath} = pkg;
export function Welcome() {
  return (
    <main>
      
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            
          </div>
        </header>
        <div className="max-w-[600px] w-full space-y-6 px-4">
  <div>
    <h1 className="py-2.5 px-5 mb-2 text-center text-5xl font-medium text-black-900 dark: text-white-900 center font-large text-black-900" >
    Play Around With Automatons </h1>
  </div>
  <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
    <div className="flex justify-between">
      <NavButton navLink="/create" buttonName="Create Puzzle"></NavButton>
      <NavButton navLink="/join" buttonName="Solve Puzzle"></NavButton>
    </div>
  </nav>
</div>
    <AutomataFlow></AutomataFlow>
      </div>
    </main>
  );
}

