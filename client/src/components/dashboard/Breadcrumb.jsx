import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
      <Link to="/dashboard" className="hover:text-[#2563EB] dark:hover:text-white transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Dashboard</span>
      </Link>
      {pathnames.map((name, index) => {
        if (name === "dashboard") return null;
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center gap-1.5 capitalize">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-bold text-slate-900 dark:text-white">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
