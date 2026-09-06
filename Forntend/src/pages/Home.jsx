import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* Hero */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                TAKE BACK CONTROL
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Break the cycle of
                <span className="block text-indigo-600">
                  impulsive scrolling.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                Repeated social-media use can create strong connections
                between everyday cues, craving and reward. When access is
                instant, acting on that urge becomes easy.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                RESIDER adds a deliberate barrier between wanting access
                and getting the password.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  to="/register"
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  Login
                </Link>

              </div>

            </div>

            {/* Right - Behavioral Cycle */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-900">
                  The cycle we want to interrupt
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Cue → Craving → Action → Reward
                </p>
              </div>

              <div className="space-y-3">

                <CycleRow
                  number="01"
                  title="Cue"
                  text="Boredom, phone use or a notification"
                  icon="🧠"
                />

                <CycleRow
                  number="02"
                  title="Craving"
                  text="The urge to check the app"
                  icon="⚡"
                />

                <CycleRow
                  number="03"
                  title="Action"
                  text="Open the app and start scrolling"
                  icon="📱"
                />

                <CycleRow
                  number="04"
                  title="Reward"
                  text="Novelty, entertainment or social feedback"
                  icon="✓"
                />

              </div>

              <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-center">
                <p className="text-xs font-semibold text-indigo-700">
                  RESIDER adds friction before the action.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* Problem */}
      <section className="border-y border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-5xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold text-rose-600">
              THE COMMON CYCLE
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Delete. Reinstall. Repeat.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              A person may delete an app after realizing they spent too much
              time on it. Later, a familiar cue or craving can lead to
              reinstalling it because access is once again only a few taps away.
            </p>

          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-5">

            <MiniStep
              title="Use"
              text="Long scrolling"
            />

            <Arrow />

            <MiniStep
              title="Regret"
              text="Time wasted"
            />

            <Arrow />

            <MiniStep
              title="Delete"
              text="Remove access"
            />

            <Arrow />

            <MiniStep
              title="Craving"
              text="Want it again"
            />

            <Arrow />

            <MiniStep
              title="Reinstall"
              text="Access returns"
            />

          </div>

        </div>
      </section>


      {/* How RESIDER helps */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-sm font-semibold text-indigo-600">
              HOW RESIDER HELPS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create distance between impulse and action.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Instead of relying entirely on willpower, RESIDER introduces
              behavioral friction when you try to access a controlled app.
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <FeatureCard
              number="01"
              title="Store"
              text="Keep the difficult password inside your RESIDER vault."
            />

            <FeatureCard
              number="02"
              title="Block"
              text="Choose how long you want the password to remain inaccessible."
            />

            <FeatureCard
              number="03"
              title="Access"
              text="After the block ends, a short access window gives you a deliberate choice."
            />

          </div>

        </div>
      </section>


      {/* Simple science */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
                🔬
              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Why friction matters
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Repeated behavior can strengthen associations between
                  cues and expected rewards. This can create automatic
                  wanting or craving. By adding a delay between the urge
                  and the action, RESIDER gives you time to make a more
                  deliberate decision.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  <Tag text="Cue Reactivity" />
                  <Tag text="Craving" />
                  <Tag text="Reinforcement" />
                  <Tag text="Habit Formation" />
                  <Tag text="Behavioral Friction" />

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Final CTA */}
      <section className="bg-slate-900 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white">
            🔐
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Don't fight every impulse.
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Create enough distance to decide what you actually want.
          </p>

          <div className="mt-7">

            <Link
              to="/register"
              className="inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start with RESIDER
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}


/* ------------------------------------------
   Components
------------------------------------------ */

function CycleRow({ number, title, text, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
        {icon}
      </div>

      <div className="flex-1">

        <div className="flex items-center gap-2">

          <span className="text-xs font-bold text-indigo-600">
            {number}
          </span>

          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

        </div>

        <p className="mt-1 text-xs text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}


function MiniStep({ title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">

      <h3 className="text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        {text}
      </p>

    </div>
  );
}


function Arrow() {
  return (
    <div className="hidden items-center justify-center text-slate-300 md:flex">
      →
    </div>
  );
}


function FeatureCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <span className="text-xs font-bold text-indigo-600">
        {number}
      </span>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


function Tag({ text }) {
  return (
    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
      {text}
    </span>
  );
}


export default Home;