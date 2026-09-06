function HowItWorks() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* Hero */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                HOW RESIDER WORKS
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Break the cycle.
                <span className="block text-indigo-600">
                  Not your willpower.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                Problematic social-media use is not always about making a
                conscious decision to keep scrolling. Repeated exposure can
                create strong associations between everyday cues and the
                expectation of reward.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                RESIDER adds deliberate friction between the moment you want
                to use an app and the moment you can actually access it.
              </p>
            </div>

            {/* Scientific visual */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    The behavioral cycle
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Cue → Craving → Action → Reward
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  🧠
                </div>
              </div>

              <svg
                viewBox="0 0 500 360"
                className="w-full"
                role="img"
                aria-label="Behavioral cycle showing cue, craving, action and reward"
              >

                {/* Connecting arrows */}
                <path
                  d="M250 55 C380 55 440 110 440 180"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                />

                <path
                  d="M440 180 C440 275 365 310 250 310"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                />

                <path
                  d="M250 310 C130 310 60 270 60 180"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                />

                <path
                  d="M60 180 C60 100 130 55 250 55"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                />

                {/* Cue */}
                <circle
                  cx="250"
                  cy="55"
                  r="48"
                  fill="#eef2ff"
                  stroke="#6366f1"
                  strokeWidth="2"
                />

                <text
                  x="250"
                  y="50"
                  textAnchor="middle"
                  fill="#3730a3"
                  fontSize="16"
                  fontWeight="600"
                >
                  Cue
                </text>

                <text
                  x="250"
                  y="70"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                >
                  boredom / phone
                </text>

                {/* Craving */}
                <circle
                  cx="440"
                  cy="180"
                  r="48"
                  fill="#fff7ed"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />

                <text
                  x="440"
                  y="175"
                  textAnchor="middle"
                  fill="#b45309"
                  fontSize="16"
                  fontWeight="600"
                >
                  Craving
                </text>

                <text
                  x="440"
                  y="195"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                >
                  wanting
                </text>

                {/* Action */}
                <circle
                  cx="250"
                  cy="310"
                  r="48"
                  fill="#fff1f2"
                  stroke="#f43f5e"
                  strokeWidth="2"
                />

                <text
                  x="250"
                  y="305"
                  textAnchor="middle"
                  fill="#be123c"
                  fontSize="16"
                  fontWeight="600"
                >
                  Action
                </text>

                <text
                  x="250"
                  y="325"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                >
                  open / scroll
                </text>

                {/* Reward */}
                <circle
                  cx="60"
                  cy="180"
                  r="48"
                  fill="#ecfdf5"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                <text
                  x="60"
                  y="175"
                  textAnchor="middle"
                  fill="#047857"
                  fontSize="16"
                  fontWeight="600"
                >
                  Reward
                </text>

                <text
                  x="60"
                  y="195"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                >
                  novelty / social
                </text>

                {/* Center */}
                <circle
                  cx="250"
                  cy="180"
                  r="54"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />

                <text
                  x="250"
                  y="174"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="14"
                  fontWeight="600"
                >
                  Habit
                </text>

                <text
                  x="250"
                  y="194"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                >
                  reinforcement
                </text>

              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* Why the cycle happens */}
      <section className="border-y border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-indigo-600">
              THE PROBLEM
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Knowing you should stop is not always enough.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              With repeated use, certain situations can become associated
              with the expectation of reward. These learned associations
              can make the urge to check an app appear automatically.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                01
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                A cue appears
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Boredom, picking up your phone, a notification, or seeing
                an app icon can become associated with previous rewards.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                02
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Wanting appears
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                The cue can trigger an urge or craving before you have
                consciously decided whether using the app is a good idea.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                03
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Action becomes automatic
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                When access is immediate, the easiest response can be to
                open the app and start scrolling.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Delete / reinstall cycle */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">
            <p className="text-sm font-semibold text-rose-600">
              THE DELETE → REINSTALL CYCLE
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Removing the app can interrupt access.
              <span className="block text-slate-500">
                But it may not remove the learned urge.
              </span>
            </h2>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="grid items-center gap-6 md:grid-cols-5">

              <CycleItem
                number="1"
                title="Use"
                text="Extended scrolling"
              />

              <Arrow />

              <CycleItem
                number="2"
                title="Regret"
                text="I wasted my time"
              />

              <Arrow />

              <CycleItem
                number="3"
                title="Delete"
                text="Remove access"
              />

            </div>

            <div className="my-8 h-px bg-slate-100" />

            <div className="grid items-center gap-6 md:grid-cols-5">

              <CycleItem
                number="4"
                title="Craving"
                text="Want to check again"
              />

              <Arrow />

              <CycleItem
                number="5"
                title="Reinstall"
                text="Access becomes easy"
              />

              <Arrow />

              <CycleItem
                number="6"
                title="Repeat"
                text="The cycle returns"
              />

            </div>

          </div>
        </div>
      </section>

      {/* RESIDER solution */}
      <section className="bg-slate-900 px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-indigo-300">
              THE RESIDER APPROACH
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Add friction between the urge and the action.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              RESIDER does not ask you to rely entirely on willpower.
              Instead, it creates a deliberate delay between wanting access
              and obtaining the password.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">

            <SolutionCard
              number="01"
              title="Choose"
              text="Select the app or website you want to control."
            />

            <SolutionCard
              number="02"
              title="Lock"
              text="Store its password securely and choose a blocking period."
            />

            <SolutionCard
              number="03"
              title="Wait"
              text="During the block, the password remains inaccessible."
            />

            <SolutionCard
              number="04"
              title="Decide"
              text="When access opens, use the short window deliberately."
            />

          </div>

          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white">
                🔐
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  The goal is not punishment.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The goal is to introduce enough behavioral friction to
                  interrupt automatic action and give you time to make a
                  deliberate decision.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Simple science explanation */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">
            <p className="text-sm font-semibold text-indigo-600">
              THE SCIENCE BEHIND THE IDEA
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              A few concepts explain the cycle
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            <ScienceCard
              title="Cue Reactivity"
              text="Previously learned cues can trigger attention, motivation, or craving related to a behavior."
            />

            <ScienceCard
              title="Reward & Reinforcement"
              text="Social feedback, novelty, entertainment and other rewards can reinforce repeated engagement."
            />

            <ScienceCard
              title="Habit Formation"
              text="Repeated stimulus-response patterns can become increasingly automatic and less dependent on deliberate decisions."
            />

            <ScienceCard
              title="Behavioral Friction"
              text="Adding a deliberate obstacle can create a gap between an impulse and the action that normally follows it."
            />

          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white shadow-sm">
            🔒
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            RESIDER gives you time to choose.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            You don't need to fight every urge with willpower.
            Sometimes, creating a little distance is enough to make the
            decision yours again.
          </p>

        </div>
      </section>

    </div>
  );
}


/* ------------------------------------------
   Small reusable components
------------------------------------------ */

function CycleItem({ number, title, text }) {
  return (
    <div className="text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
        {number}
      </div>

      <h3 className="mt-3 font-semibold text-slate-900">
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
    <div className="hidden text-center text-slate-300 md:block">
      →
    </div>
  );
}


function SolutionCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

      <span className="text-xs font-bold text-indigo-300">
        {number}
      </span>

      <h3 className="mt-4 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {text}
      </p>

    </div>
  );
}


function ScienceCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

      <div className="flex items-start gap-4">

        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" />

        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text}
          </p>
        </div>

      </div>

    </div>
  );
}


export default HowItWorks;