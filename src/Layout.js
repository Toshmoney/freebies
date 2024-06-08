import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main className="flex flex-col w-full bg-[#f1ffef]">
      <Header />
      <Outlet />
    </main>
  );
}