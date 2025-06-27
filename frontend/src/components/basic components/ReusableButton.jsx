const ReusableButton = ({ onClick, children, icon: Icon, imoji}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl 
                bg-primary/80 text-primary-content hover:bg-primary 
                transition-all duration-300"
    >
      {Icon ? (<Icon className="w-4 h-4 text-primary-content" /> )
            : (imoji && <span className="text-2xl">{imoji}</span>)
            }
      <span className="font-semibold tracking-wide text-sm text-primary-content">
        {children}
      </span>
    </button>
  );
};

export default ReusableButton;
