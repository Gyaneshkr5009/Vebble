const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center relative h-screen bg-gradient-to-br from-base-200 to-base-300 overflow-hidden">
      {/* Dynamic chat bubble background with depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating bubbles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 140 + 60;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 8;
          const duration = 15 + Math.random() * 30;
          const opacity = 0.08 + Math.random() * 0.12;
          const colorClass = i % 4 === 0 ? 'bg-primary' : 
                           i % 3 === 0 ? 'bg-secondary' : 
                           i % 2 === 0 ? 'bg-accent' : 'bg-info';
          const blur = Math.random() * 20 + 10;
          
          return (
            <div 
              key={i}
              className={`absolute rounded-full ${colorClass} animate-float`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
        
        {/* Connected dots pattern (social network effect) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {[...Array(25)].map((_, i) => {
            const cx = Math.random() * 100;
            const cy = Math.random() * 100;
            return (
              <circle key={`dot-${i}`} cx={`${cx}%`} cy={`${cy}%`} r="1.5" fill="currentColor" className="text-base-content" />
            );
          })}
          {/* Connect some dots to represent social connections */}
          {[...Array(15)].map((_, i) => {
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = x1 + (Math.random() * 20 - 10);
            const y2 = y1 + (Math.random() * 20 - 10);
            return (
              <line 
                key={`line-${i}`} 
                x1={`${x1}%`} 
                y1={`${y1}%`} 
                x2={`${x2}%`} 
                y2={`${y2}%`} 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className="text-base-content/30"
              />
            );
          })}
        </svg>
      </div>

      {/* Modern social auth card */}
      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl backdrop-blur-xl bg-base-100/80 border border-base-content/10 shadow-2xl text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-secondary/10 blur-xl"></div>
        
        {/* App branding with status */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-base-100"></div>
          </div>
          <h2 className="text-3xl font-extrabold text-primary mt-2">{title}</h2>
          <p className="text-sm text-base-content/60 mt-1">Connect with friends</p>
        </div>
        
        {/* Social proof element */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex -space-x-3 mr-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`avatar-${i}`} 
                className="w-8 h-8 rounded-full bg-neutral/20 border-2 border-base-100 flex items-center justify-center text-xs"
                style={{
                  backgroundColor: `hsl(${i * 70}, 70%, 85%)`,
                  color: `hsl(${i * 70}, 70%, 30%)`,
                  zIndex: 5 - i
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-base-content/60">Start chatting now</span>
        </div>
        
        {/* Animated input field */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-base-200 rounded-lg p-4 flex items-center transition-all duration-200 group-hover:shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-base-content/40 mr-3 group-hover:text-primary transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-base-content/50 group-hover:text-base-content transition-colors">Your email address</span>
          </div>
        </div>
        
        {/* Subtle call-to-action */}
        <p className="text-sm text-base-content/50 mb-1">{subtitle}</p>
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-base-content/10 to-transparent my-4"></div>
        
        {/* Social login options */}
        <div className="flex justify-center space-x-4 mt-6">
          {['Google', 'Facebook', 'Apple'].map((provider) => (
            <button 
              key={provider}
              className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center hover:bg-base-300 transition-colors"
              aria-label={`Login with ${provider}`}
            >
              <span className="text-base-content/60 hover:text-base-content transition-colors">
                {provider.charAt(0)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;