import type { Route } from "./+types/home";
import { Create } from "../create/create-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Making New Automata" },
    { name: "description", content: "Welcome to the automata maker" },
  ];
}

export default function Home() {
  return <Create />;
}