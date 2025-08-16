import { Component } from "react";
import { NavLink } from "react-router";

interface AutomataButtonProps {
  buttonName: string;
  onCommand: () => void;
  selected: boolean;
}

export class AutomataTypeButton extends Component<AutomataButtonProps> {
  render() {
    const baseClasses =
      "w-full py-2.5 px-5 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4";
    
    const selectedClasses =
      "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white focus:ring-blue-300";
    
    const unselectedClasses =
      "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 " +
      "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700";

    return (
      <button
        type="button"
        className={`${baseClasses} ${this.props.selected ? selectedClasses : unselectedClasses}`}
        onClick={this.props.onCommand}
      >
        {this.props.buttonName}
      </button>
    );
  }
}