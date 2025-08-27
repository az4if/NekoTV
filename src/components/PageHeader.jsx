import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageHeader = ({ title }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-[#89bcf8] hover:text-[#a29bfc] transition-colors">
            Home
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = value.replace(/-/g, ' ');
            
            return isLast ? (
              <span key={to} className="flex items-center gap-2">
                <span className="text-neutral-400">/</span>
                <span className="text-[#a29bfc] capitalize">{name}</span>
              </span>
            ) : (
              <span key={to} className="flex items-center gap-2">
                <span className="text-neutral-400">/</span>
                <Link to={to} className="text-[#89bcf8] hover:text-[#a29bfc] transition-colors capitalize">
                  {name}
                </Link>
              </span>
            );
          })}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#89bcf8] capitalize">
          {title || pathnames[pathnames.length - 1]?.replace(/-/g, ' ') || 'Page'}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
