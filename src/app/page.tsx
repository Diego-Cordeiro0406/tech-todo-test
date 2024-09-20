import Header from "./components/Header";
import TasksList from "./components/TaskList";
import "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <TasksList />
    </>
  );
}
