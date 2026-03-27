export default function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="w-80 bg-[#0b1b3a] flex flex-col justify-between p-10 text-white flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-14">
            <div className="flex items-end gap-0.5">
              <span className="w-1.5 h-3 rounded-sm bg-blue-400 opacity-60"></span>
              <span className="w-1.5 h-4 rounded-sm bg-blue-300 opacity-80"></span>
              <span className="w-1.5 h-2 rounded-sm bg-blue-400 opacity-60"></span>
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-100">
              pcs wireless
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-snug mb-4">
            Welcome to your<br />Customer Portal
          </h1>
          <p className="text-sm text-blue-200/70 mb-10 leading-relaxed">
            Manage orders, track shipments, handle invoices, and access support – all in one place.
          </p>

          <ul className="space-y-3">
            {[
              'Real-time order tracking',
              'Instant shipment updates',
              'Seamless invoice management',
              '24/7 dedicated support',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-blue-300/40">
          Supplying the World with Pre-Owned and New Devices.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter your credentials to access the portal
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="buyer@company.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0b1b3a] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#112654] transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['Google', 'Microsoft', 'Apple'].map((provider) => (
              <button
                key={provider}
                className="border border-gray-300 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
