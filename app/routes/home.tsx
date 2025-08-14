import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Beautiful Automata" },
    { name: "description", content: "Welcome to Beautiful Automata!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
