import pkg from 'react-katex';
import { AutomataTypeButton } from '~/components/automata-type-button';
import Header from '~/components/header';
const {BlockMath, InlineMath} = pkg;
const automataTypes = ["DFA","NFA","PDA","TM","CFG"];
export function Create() {
    const renderedButtons = automataTypes.map(x=> <AutomataTypeButton buttonName={x} navLink='/create'></AutomataTypeButton>)

  return (
    <main>
        <Header></Header>
      <div className="flex-1 flex flex-col items-left gap-16 min-h-0">
        <div className="max-w-[200px] w-full space-y-6 px-4">
   <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black-900 dark: text-white-900 center font-large text-black-900" >
    Create </h1>
  <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
   
    {renderedButtons}
  </nav>
</div>

      </div>
    </main>
  );
}


