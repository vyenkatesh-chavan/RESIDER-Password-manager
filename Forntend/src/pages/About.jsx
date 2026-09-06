function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
            🔐
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Technology should work for you,
            not against you.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            RESIDER is built to help people create distance between
            an impulse and an action by adding intentional friction
            to digital habits.
          </p>

        </div>
      </section>


      {/* ================================================== */}
      {/* WHY RESIDER */}
      {/* ================================================== */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Why RESIDER
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Willpower is not always the problem.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Many digital habits are triggered before we consciously
              decide what we want to do. A notification, a moment of
              boredom, or simply seeing an app can become a cue that
              leads to an automatic response.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              RESIDER takes a different approach. Instead of asking
              people to rely entirely on willpower, we introduce
              deliberate friction between the urge and access.
            </p>

          </div>


          {/* Cycle */}

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <p className="mb-6 text-sm font-semibold text-slate-900">
              The cycle we want to interrupt
            </p>

            <div className="space-y-3">

              {[
                ["01", "Cue", "Something triggers the urge."],
                ["02", "Craving", "The expected reward creates wanting."],
                ["03", "Action", "The app is opened almost automatically."],
                ["04", "Reward", "Novelty, feedback or entertainment reinforces the behavior."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >

                  <span className="font-mono text-xs font-semibold text-indigo-500">
                    {number}
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {description}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* OUR APPROACH */}
      {/* ================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Our approach
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Create space between wanting and doing.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              RESIDER does not try to make decisions for you. It
              changes the environment around the decision.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                01
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Choose
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Decide which digital access you want to make
                more intentional.
              </p>

            </div>


            {/* Card 2 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                02
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Create friction
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Store the password and introduce a deliberate
                waiting period before access.
              </p>

            </div>


            {/* Card 3 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                03
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Decide
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                When access becomes available, make the decision
                deliberately instead of immediately.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* PRINCIPLES */}
      {/* ================================================== */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            What we believe
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Built around intentional technology.
          </h2>

        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Principle 1 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Intentionality
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Digital access should be a conscious choice,
              not simply the default response to an impulse.
            </p>

          </div>


          {/* Principle 2 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Friction
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              A small amount of deliberate friction can create
              valuable time for reflection.
            </p>

          </div>


          {/* Principle 3 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Privacy
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              The credentials you choose to store should be
              protected with security as a fundamental principle.
            </p>

          </div>


          {/* Principle 4 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              User control
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              RESIDER is a tool for self-control. The final
              decision always belongs to the user.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* MISSION */}
      {/* ================================================== */}

      <section className="bg-slate-900">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
            Our mission
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build technology that helps people
            regain control of their attention.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300">
            We believe the goal is not to eliminate technology.
            It is to make our relationship with it more deliberate.
            RESIDER is an attempt to make that choice easier.
          </p>

        </div>

      </section>


      {/* ================================================== */}
      {/* CTA */}
      {/* ================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Ready to take back control?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
            Start building a more intentional relationship with
            the apps you use every day.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get Started
            </a>

            <a
              href="/how-it-works"
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              How It Works
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;