// import Layout from "@components/Layout";
// import About from "@pages/About";
// import Home from "@pages/Home";
// import TodoAdd from "@pages/TodoAdd";
// import TodoDetail from "@pages/TodoDetail";
// import TodoEdit from "@pages/TodoEdit";
// import TodoList from "@pages/TodoList";
// import { createBrowserRouter } from "react-router-dom";

// export const routerFutureConfig = {
//   v7_fetcherPersist: true,
//   v7_normalizeFormMethod: true,
//   v7_partialHydration: true,
//   v7_relativeSplatPath: true,
//   v7_skipActionErrorRevalidation: true,
// };

// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         { path: "home", element: <Home /> },
//         { path: "about", element: <About /> },
//         {
//           path: "list",
//           children: [
//             { index: true, element: <TodoList /> },
//             { path: "add", element: <TodoAdd /> },
//             {
//               path: "detail/:id",
//               children: [
//                 { index: true, element: <TodoDetail /> },
//                 {
//                   path: "edit",
//                   element: <TodoEdit />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   {
//     future: routerFutureConfig,
//   }
// );

// export default router;

import Layout from "@components/Layout";
import About from "@pages/About";
import Home from "@pages/Home";
import TodoAdd from "@pages/TodoAdd";
import TodoDetail from "@pages/TodoDetail";
import TodoEdit from "@pages/TodoEdit";
import TodoList from "@pages/TodoList";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        { path: "add", element: <TodoAdd /> },

        {
          path: "list/:_id",
          element: <TodoDetail />,
          children: [{ path: "edit", element: <TodoEdit /> }],
        },
      ],
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
