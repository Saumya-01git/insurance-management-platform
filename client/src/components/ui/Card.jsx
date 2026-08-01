const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
