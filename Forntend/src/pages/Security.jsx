import React from "react";
import { Link } from "react-router-dom";

const Security = () => {
  const securityFeatures = [
    {
      icon: "🔐",
      title: "Encrypted Vault Passwords",
      description:
        "Passwords stored in your RESIDER vault are encrypted before being stored. This helps prevent sensitive passwords from being stored as readable plain text.",
    },
    {
      icon: "🛡️",
      title: "Secure Account Passwords",
      description:
        "Your RESIDER account password is protected using secure password hashing rather than being stored as plain text.",
    },
    {
      icon: "🔒",
      title: "Controlled Access",
      description:
        "Your vault is connected to your authenticated account. RESIDER checks that you are authorized before allowing access to your protected vault data.",
    },
    {
      icon: "⏳",
      title: "Time-Based Protection",
      description:
        "Vault passwords are protected by the access rules you choose. Password retrieval is restricted while a block is active and controlled when access becomes available.",
    },
    {
      icon: "🌐",
      title: "Protected Communication",
      description:
        "RESIDER is designed to use secure HTTPS communication in production to help protect information while it travels between your device and our servers.",
    },
    {
      icon: "🧱",
      title: "Multiple Layers of Protection",
      description:
        "RESIDER combines encryption, password hashing, authentication, authorization, session protection, and controlled password retrieval rather than relying on a single security mechanism.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
            🔐
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Your passwords are protected by design.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            RESIDER is built to protect the sensitive information stored in
            your vault while keeping access controlled.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            We use established security practices rather than relying on
            security through obscurity.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            How we protect your data
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Security in RESIDER works through multiple layers of protection.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Philosophy */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Security is more than encryption
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-7 text-slate-600">
              Protecting a password means controlling both how it is stored
              and when it can be accessed. RESIDER combines data protection
              with authentication and time-based access controls.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Encrypted vault data",
              "Secure password hashing",
              "Authentication & authorization",
              "Controlled password retrieval",
              "Time-based access restrictions",
              "Protected sessions",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm text-emerald-600">
                  ✓
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl">
              🔎
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Security transparency
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                We believe users should understand how their information is
                protected. At the same time, security-sensitive information
                should not be publicly exposed.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                For this reason, RESIDER explains its security principles
                without exposing credentials, cryptographic secrets, internal
                infrastructure details, or other information that could
                weaken the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold sm:text-3xl">
            Security is an ongoing process
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            No online service can honestly promise that a system is impossible
            to compromise. RESIDER is designed to reduce the risk of
            unauthorized access by applying established security practices and
            continuously improving its security architecture.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold text-slate-900">
            Take control of your access.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Store your protected passwords and make access intentional.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started
            </Link>

            <Link
              to="/how-it-works"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;