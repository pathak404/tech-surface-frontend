
const Login = () => {
  return (
    <div className="bg-base-200 min-h-screen text-center py-7">
      <h1 className="text-3xl md:text-5xl font-bold px-3">Tech Surface Education</h1>
      <p className="pt-4 px-3">
            Login to admin panel to manage students, exams, corurses and much more
      </p>
      <div className="hero mt-7 lg:mt-0">
        <div className="hero-content flex-col lg:flex-row-reverse gap-6">

            <video autoPlay loop muted className="max-w-lg hidden lg:block">
              <source src="/looking-through-resumes.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body min-w-[299px] sm:min-w-[384px]">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
