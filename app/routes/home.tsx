import Navbar from "components/navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Roomify" }, { name: "description", content: "" }];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1>Home</h1>
    </div>
  );
}
