import { useState } from "react";
import { generatePassword } from "../utils/passwordGen";

function GeneratePassword() {
  const [length, setLength] = useState(10);

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOptionChange = (option) => {
    const selectedCount = Object.values(options).filter(Boolean).length;

    if (options[option] && selectedCount === 1) {
      return;
    }

    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));

    setPassword("");
    setCopied(false);
    setShowPassword(false);
  };

  const handleGenerate = () => {
    try {
      const newPassword = generatePassword(length, options);

      setPassword(newPassword);
      setCopied(false);
      setShowPassword(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
            🔐
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Password Generator
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Generate a strong, random and difficult-to-guess password.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Password Length */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Password Length
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[8, 9, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setLength(value);
                    setPassword("");
                    setShowPassword(false);
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    length === value
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Character Types */}
          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Character Types
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Uppercase */}
              <button
                type="button"
                onClick={() => handleOptionChange("uppercase")}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  options.uppercase
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                    options.uppercase
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {options.uppercase ? "✓" : ""}
                </span>

                Uppercase
              </button>

              {/* Lowercase */}
              <button
                type="button"
                onClick={() => handleOptionChange("lowercase")}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  options.lowercase
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                    options.lowercase
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {options.lowercase ? "✓" : ""}
                </span>

                Lowercase
              </button>

              {/* Numbers */}
              <button
                type="button"
                onClick={() => handleOptionChange("numbers")}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  options.numbers
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                    options.numbers
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {options.numbers ? "✓" : ""}
                </span>

                Numbers
              </button>

              {/* Symbols */}
              <button
                type="button"
                onClick={() => handleOptionChange("symbols")}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  options.symbols
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                    options.symbols
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {options.symbols ? "✓" : ""}
                </span>

                Symbols
              </button>
            </div>
          </div>

          {/* Generate */}
          <button
            type="button"
            onClick={handleGenerate}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Generate Password
          </button>

          {/* Result */}
          {password && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Generated Password
              </label>

              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 p-3">

                {/* Password */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold tracking-widest text-slate-900 outline-none"
                />

                {/* Show / Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

                {/* Copy */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* Security Information */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-xs leading-5 text-slate-400">
              Passwords are generated locally using cryptographically secure
              randomness. The generator does not send passwords to the server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratePassword;