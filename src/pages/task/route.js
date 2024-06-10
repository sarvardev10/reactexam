import Tasks from ".";
import TaskIcon from "@mui/icons-material/Task";
export const taskRoute = [
  {
    key: "/task",
    Element: Tasks,
    label: "Tasks",
    icon: TaskIcon,
    children: [],
    visible: true,
    access: "main",
  },
];
