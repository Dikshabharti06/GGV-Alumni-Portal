import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, CalendarDays, LogOut, Menu, ShieldCheck, Users, X, LayoutDashboard } from "lucide-react";
import { api } from "../lib/api";
import { initials } from "../lib/utils";
import Brand from "./Brand";

export default function PortalLayout({ user, children }) {
  const nav = useNavigate();
  const loc = useLocation();
  const [mobile, setMobile] = useState(false);
  const links = [
    ["/dashboard", "Overview", LayoutDashboard],
    ["/directory", "Alumni directory", Users],
    ["/events", "Events & circles", CalendarDays],
    ["/announcements", "Announcements", BookOpen],
    ...(user.role === "admin" ? [["/admin", "Admin desk", ShieldCheck]] : []),
  ];
  async function logout() {
    try {
      await api.logout();
    } finally {
      nav("/");
      window.location.reload();
    }
  }
  return (
    <div className="min-h-screen flex">
      <aside
        className={`w-[250px] bg-navy text-white pt-7 px-5 pb-[22px] flex flex-col fixed top-0 bottom-0 left-0 z-10 tablet:w-[225px] mobile:w-[265px] mobile:transition-[transform] mobile:duration-200 mobile:ease-[ease] ${mobile ? "mobile:[transform:translateX(0)] mobile:[box-shadow:0_0_0_999px_#071b2d80]" : "mobile:[transform:translateX(-100%)]"}`}
      >
        <button
          className="hidden mobile:block mobile:self-end mobile:bg-transparent mobile:text-white"
          onClick={() => setMobile(false)}
        >
          <X />
        </button>
        <Brand variant="sidebar" />
        <div className="text-[9px] text-[#688397] tracking-[1.7px] font-bold mt-7 mb-[10px] mx-[13px]">
          YOUR NETWORK
        </div>
        {links.map(([path, label, Icon]) => (
          <Link
            key={path}
            className={`flex items-center gap-3 p-[13px] text-[12px] my-[3px] hover:bg-[#ffffff12] hover:text-white ${loc.pathname === path ? "bg-[#ffffff12] text-white" : "text-[#a8bbc9]"}`}
            to={path}
            onClick={() => setMobile(false)}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
        <div className="mt-auto">
          <div className="flex items-center gap-2.5 border-t border-[#ffffff1b] py-[18px] px-[7px]">
            <div className="h-[35px] w-[35px] grid place-items-center bg-[#e2ecec] text-[#24475a] rounded-[50%] text-[11px] font-bold shrink-0">
              {initials(user.name)}
            </div>
            <div>
              <b className="block max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px]">
                {user.name}
              </b>
              <span className="block max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#9fb4c3] capitalize mt-[3px]">
                {user.role}
              </span>
            </div>
          </div>
          <button
            className="w-full bg-transparent text-[#b4c5cf] flex items-center gap-2.5 py-3 px-2 text-[12px] hover:text-white"
            onClick={logout}
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <main className="ml-[250px] w-[calc(100%_-_250px)] min-h-screen tablet:ml-[225px] tablet:w-[calc(100%_-_225px)] mobile:ml-0 mobile:w-full">
        <header className="h-[78px] bg-white border-b border-line flex items-center justify-between px-[4%] sticky top-0 z-[4] mobile:h-[68px] mobile:px-[18px]">
          <button
            className="hidden mobile:block mobile:bg-transparent mobile:text-ink mobile:p-[5px]"
            onClick={() => setMobile(true)}
          >
            <Menu />
          </button>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[9px] tracking-[1.5px] text-teal font-bold">
              GGV ALUMNI NETWORK
            </span>
            <b className="text-[13px] mobile:text-[12px]">Community portal</b>
          </div>
          <div className="flex items-center gap-2.5 text-[12px]">
            <div className="h-[35px] w-[35px] grid place-items-center bg-[#e2ecec] text-[#24475a] rounded-[50%] text-[11px] font-bold shrink-0">
              {initials(user.name)}
            </div>
            <span className="mobile:hidden">{user.name}</span>
          </div>
        </header>
        <div className="py-9 px-[4.5%] max-w-[1450px] m-auto mobile:py-[25px] mobile:px-[17px]">
          {children}
        </div>
      </main>
    </div>
  );
}
