import { useSelector } from "react-redux";
import Task from "../Task/Task";
import { selectVisibleTasks } from "../../redux/tasksSlice";

import css from "./TaskList.module.css";

export default function TaskList() {
  //const tasks = useSelector((state) => state.tasks.items);
  //const tasks = useSelector(selectTasks);
  //const textFilter = useSelector((state) => state.filters.text);
  //const textFilter = useSelector(selectTextFilter);

  // const visibleTasks = tasks.filter((task) =>
  //   task.text.toLowerCase().includes(textFilter.toLowerCase())
  // );

  const visibleTasks = useSelector(selectVisibleTasks);

  return (
    <ul className={css.list}>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}
