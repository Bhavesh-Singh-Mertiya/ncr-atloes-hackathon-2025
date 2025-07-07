import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../layouts/Header/Header";
import Sidebar from "../layouts/Sidebar/Sidebar";
import { routes } from "./routes";

function BasicLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {routes.map((route) => {
        if (route.isPrivate) {
          return (
            <Route path="/" element={<BasicLayout />}>
              <Route
                key={route.id}
                path={`${process.env.REACT_APP_BASE_URL}${route.path}`}
                element={
                  <Suspense fallback={() => <h1>Loading....</h1>}>
                    <route.component {...route} />
                  </Suspense>
                }
              />
            </Route>
          );
        } else {
          return (
            <Route
              key={route.id}
              path={`${process.env.REACT_APP_BASE_URL}${route.path}`}
              element={
                <Suspense fallback={() => <h1>Loading....</h1>}>
                  <route.component {...route} />
                </Suspense>
              }
            />
          );
        }
      })}
    </Routes>
  );
}
