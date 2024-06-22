import Footer from "./Footer";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import AdComponent from "./pages/adComponent";

export default function Layout() {
  return (
    <main className="flex flex-col w-full bg-[#f1ffef]">
      <Header />
      <Outlet />
      <div style={{ width: '100%', height: '200px' }}>
            <AdComponent adSlot="4876440975" />
      </div>
      <Footer/>
    </main>
  );
}