import "./use.module.css";
import Projects from "../../projects/Projects";
export default function Use() {
  const list = ["pro1", "pro2", "pro3"];
  return (
    <main className="main">
      <div>
        <Projects projects={list} />
      </div>
    </main>
  );
}
