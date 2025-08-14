import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Making New Automata" },
    { name: "description", content: "Welcome to the automata maker" },
  ];
}