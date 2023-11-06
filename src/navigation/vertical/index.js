export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  {
    title: "Second page",
    to: { name: "second-page" },
    icon: { icon: "tabler-file" },
    meta: {
      requiredRole: ["admin"],
    },
  },
  {
    title: "My Page",
    to: { name: "customePage-myPage" },
    icon: { icon: "tabler-border-inner" },
    meta: {
      requiredRole: ["admin"],
    },
  },
  {
    title: "To Do",
    icon: { icon: "table-task" },
    children: [
      {
        title: "Add",
        to: { name: "Todo-addTodo" },
        icon: { icon: "tabler-square-plus" },
      },
      {
        title: "List",
        to: { name: "Todo-userList" },
        icon: { icon: "tabler-square-plus" },
      },
    ],
  },
];
