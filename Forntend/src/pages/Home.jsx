
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Secure Your Instagram Account",
    description:
      "Make sure your Instagram account and recovery email are secure. RESIDER does not change your Instagram password or directly block Instagram.",
  },
  {
    number: "02",
    title: "Save Your Password in RESIDER",
    description:
      "Generate a strong, random password, update your Instagram password, and store it securely in your RESIDER vault. Keep your secret key safe.",
  },
  {
    number: "03",
    title: "Choose Your Break Duration",
    description:
      "Choose a block duration that matches your goal. RESIDER keeps the saved password inaccessible during the configured block period.",
  },
  {
    number: "04",
    title: "Create Friction Before Logging In",
    description:
      "When you feel the urge to open Instagram, the password restriction gives you time to pause and reconsider instead of immediately logging in.",
  },
];

const durations = [
  {
    days: "1–3 Days",
    title: "Short Break",
    description: "Take a break from frequent checking.",
    color: "border-emerald-200 bg-emerald-50",
  },
  {
    days: "7 Days",
    title: "Weekly Reset",
    description: "Create distance from daily scrolling.",
    color: "border-indigo-200 bg-indigo-50",
  },
  {
    days: "14 Days",
    title: "Extended Break",
    description: "Build a more intentional routine.",
    color: "border-amber-200 bg-amber-50",
  },
  {
    days: "21+ Days",
    title: "Longer Break",
    description:
      "Review your habits and consider temporary deactivation if it suits your goals.",
    color: "border-rose-200 bg-rose-50",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
        <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          Take control of your digital habits
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Take a Break from Instagram.
          <span className="mt-2 block text-indigo-600">
            Make Your Decision Deliberate.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          RESIDER helps you introduce a delay between the urge to use an app
          and accessing its password. Set your own break duration and make
          impulsive logins less convenient.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Get Started
          </Link>

          <Link
            to="/how-it-works"
            className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            How It Works
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          RESIDER manages access to stored credentials; it does not directly
          block Instagram or guarantee that account recovery is impossible.
        </p>
      </section>

      {/* Steps */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              How to Use RESIDER
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Four steps to introduce friction and make your app usage more
              intentional.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Duration guide */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Choose Your Break
          </h2>
          <p className="mt-4 text-slate-600">
            Start with a realistic duration and adjust based on your experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {durations.map((duration) => (
            <article
              key={duration.days}
              className={`rounded-2xl border p-6 ${duration.color}`}
            >
              <p className="text-sm font-semibold text-slate-600">
                Suggested duration
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                {duration.days}
              </h3>

              <p className="mt-3 font-semibold">{duration.title}</p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {duration.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Twenty-one days is a suggested planning milestone, not a scientifically
          guaranteed time to break a habit.
        </p>
      </section>

      {/* Email and recovery */}
      <section className="bg-slate-900 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">
              What About Password Recovery?
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Blocking or filtering Instagram emails alone cannot guarantee
              that you will be unable to reset your password. Instagram may
              offer other recovery methods.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Keep your recovery email secure, review your recovery phone
              number and other account options, and avoid keeping backup
              passwords somewhere easily accessible.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-7">
            <h3 className="text-xl font-bold">Remember</h3>

            <ul className="mt-5 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                Store credentials securely in your vault.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                Keep your secret key private.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                Understand that RESIDER cannot prevent every recovery route.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                Use Instagram's official settings for account deactivation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Long break */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          Taking a Break for 21+ Days?
        </h2>

        <p className="mt-5 leading-7 text-slate-600">
          Consider whether Instagram is helping you reach your goals. If you
          want a more complete break, you can explore Instagram's official
          temporary deactivation option. RESIDER does not deactivate accounts
          automatically, and the choice remains yours.
        </p>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Visit Instagram
        </a>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-indigo-50 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">
          Your Time. Your Choice.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          RESIDER is designed to create a pause between an impulse and an
          action, helping you make a more deliberate decision.
        </p>

        <Link
          to="/register"
          className="mt-7 inline-flex rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          Create Your RESIDER Account
        </Link>
      </section>
    </main>
  );
}

export default Home;
