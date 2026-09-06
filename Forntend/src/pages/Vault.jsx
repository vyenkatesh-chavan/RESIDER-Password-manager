import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const SECOND_MS = 1000;

// ------------------------------------------
// Format countdown
// ------------------------------------------

const formatCountdown = (milliseconds) => {
  if (milliseconds <= 0) {
    return "0 minutes 0 seconds";
  }

  const totalSeconds = Math.floor(
    milliseconds / SECOND_MS
  );

  const days = Math.floor(
    totalSeconds / (24 * 60 * 60)
  );

  const hours = Math.floor(
    (totalSeconds % (24 * 60 * 60)) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days} ${
      days === 1 ? "day" : "days"
    } ${hours} ${
      hours === 1 ? "hour" : "hours"
    }`;
  }

  if (hours > 0) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    }`;
  }

  return `${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  } ${seconds} ${
    seconds === 1 ? "second" : "seconds"
  }`;
};

// ------------------------------------------
// Format exact date and time
// ------------------------------------------

const formatDateTime = (date) => {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
};

function Vault() {
  const [appName, setAppName] = useState("");
  const [password, setPassword] = useState("");
  const [blockDays, setBlockDays] = useState("");

  const [vaultItems, setVaultItems] = useState([]);

  const [now, setNow] = useState(Date.now());

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");

  // ------------------------------------------
  // DELETE CONFIRMATION STATES
  // ------------------------------------------

  const [deleteItem, setDeleteItem] = useState(null);

  const [showFirstConfirmation, setShowFirstConfirmation] =
    useState(false);

  const [showSecondConfirmation, setShowSecondConfirmation] =
    useState(false);

  // ------------------------------------------
  // Timer
  // ------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, SECOND_MS);

    return () => clearInterval(timer);
  }, []);

  // ------------------------------------------
  // Load vault
  // ------------------------------------------

  useEffect(() => {
    const loadVault = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/vault`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setError(
              "Please login to access your vault."
            );
          } else {
            setError(
              data.message ||
                "Failed to load vault."
            );
          }

          return;
        }

        setVaultItems(data.items || []);
      } catch (error) {
        console.error(
          "Load vault error:",
          error
        );

        setError(
          "Unable to connect to the server. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVault();
  }, []);

  // ------------------------------------------
  // Add password
  // ------------------------------------------

  const handleAddPassword = async (e) => {
    e.preventDefault();

    setError("");

    const days = Number(blockDays);

    if (
      !appName.trim() ||
      !password ||
      !days ||
      days <= 0
    ) {
      setError(
        "Please enter app name, password and valid block days."
      );

      return;
    }

    try {
      setAdding(true);

      const response = await fetch(
        `${API_URL}/api/vault`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            appName: appName.trim(),
            password,
            blockDays: days,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to add password."
        );

        return;
      }

      setVaultItems((prev) => [
        data.item,
        ...prev,
      ]);

      setAppName("");
      setPassword("");
      setBlockDays("");

      setNow(Date.now());
    } catch (error) {
      console.error(
        "Add password error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setAdding(false);
    }
  };

  // ------------------------------------------
  // Copy password
  // ------------------------------------------

  const handleCopy = async (item) => {
    try {
      setError("");

      const currentTime = Date.now();

      const blockEndsAt =
        new Date(
          item.blockEndsAt
        ).getTime();

      const accessEndsAt =
        item.accessEndsAt
          ? new Date(
              item.accessEndsAt
            ).getTime()
          : null;

      // ------------------------------------------
      // Still blocked
      // ------------------------------------------

      if (currentTime < blockEndsAt) {
        setError(
          "Password is currently locked."
        );

        return;
      }

      // ------------------------------------------
      // Existing access window expired
      // ------------------------------------------

      if (
        accessEndsAt &&
        currentTime >= accessEndsAt
      ) {
        setError(
          "Access window has expired."
        );

        await refreshVault();

        return;
      }

      // ------------------------------------------
      // Ask backend for password
      // ------------------------------------------

      const response = await fetch(
        `${API_URL}/api/vault/${item.id}/password`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Password is currently locked."
        );

        await refreshVault();

        return;
      }

      // ------------------------------------------
      // Copy password
      // ------------------------------------------

      await navigator.clipboard.writeText(
        data.password
      );

      // ------------------------------------------
      // Backend starts access window
      // ------------------------------------------

      if (data.accessEndsAt) {
        setVaultItems((items) =>
          items.map((vaultItem) =>
            vaultItem.id === item.id
              ? {
                  ...vaultItem,
                  status: "access",
                  accessEndsAt:
                    data.accessEndsAt,
                }
              : vaultItem
          )
        );

        setNow(Date.now());
      }
    } catch (error) {
      console.error(
        "Failed to copy password:",
        error
      );

      setError(
        "Failed to copy password. Please try again."
      );
    }
  };

  // ------------------------------------------
  // Refresh vault
  // ------------------------------------------

  const refreshVault = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/vault`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVaultItems(
          data.items || []
        );

        setNow(Date.now());
      }
    } catch (error) {
      console.error(
        "Refresh vault error:",
        error
      );
    }
  };

  // ------------------------------------------
  // OPEN DELETE CONFIRMATION
  // ------------------------------------------

  const handleDeleteClick = (item) => {
    const currentTime = Date.now();

    const blockEndsAt =
      new Date(
        item.blockEndsAt
      ).getTime();

    const accessEndsAt =
      item.accessEndsAt
        ? new Date(
            item.accessEndsAt
          ).getTime()
        : null;

    const blockFinished =
      currentTime >= blockEndsAt;

    const accessAvailable =
      blockFinished &&
      (
        accessEndsAt === null ||
        currentTime < accessEndsAt
      );

    // ------------------------------------------
    // Delete is ONLY allowed during access
    // ------------------------------------------

    if (!accessAvailable) {
      setError(
        "You can only delete a block when password access is available."
      );

      return;
    }

    setDeleteItem(item);
    setShowFirstConfirmation(true);
  };

  // ------------------------------------------
  // FIRST CONFIRMATION
  // ------------------------------------------

  const handleFirstDeleteConfirmation = () => {
    setShowFirstConfirmation(false);
    setShowSecondConfirmation(true);
  };

  // ------------------------------------------
  // SECOND CONFIRMATION
  // ------------------------------------------

  const handleFinalDelete = async () => {
    if (!deleteItem) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/vault/${deleteItem.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to delete the vault item."
        );

        return;
      }

      setVaultItems((items) =>
        items.filter(
          (item) =>
            item.id !== deleteItem.id
        )
      );

      setShowSecondConfirmation(false);
      setShowFirstConfirmation(false);
      setDeleteItem(null);
    } catch (error) {
      console.error(
        "Delete password error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  // ------------------------------------------
  // CANCEL DELETE
  // ------------------------------------------

  const handleCancelDelete = () => {
    setShowFirstConfirmation(false);
    setShowSecondConfirmation(false);
    setDeleteItem(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">

      <div className="mx-auto max-w-4xl">

        {/* ---------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------- */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Password Vault
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Store passwords and control when they can be accessed.
          </p>

        </div>

        {/* ---------------------------------- */}
        {/* ERROR */}
        {/* ---------------------------------- */}

        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4">

            <p className="text-sm text-rose-600">
              {error}
            </p>

          </div>
        )}

        {/* ---------------------------------- */}
        {/* ADD PASSWORD */}
        {/* ---------------------------------- */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Add Password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add an app and decide how long its password should remain blocked.
          </p>

          <form
            onSubmit={handleAddPassword}
            className="mt-6 space-y-5"
          >

            {/* App Name */}

            <div>

              <label
                htmlFor="appName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                App / Website Name
              </label>

              <input
                id="appName"
                type="text"
                value={appName}
                onChange={(e) =>
                  setAppName(e.target.value)
                }
                placeholder="e.g. Instagram"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Block Days */}

            <div>

              <label
                htmlFor="blockDays"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Time to Block
              </label>

              <div className="flex items-center gap-3">

                <input
                  id="blockDays"
                  type="number"
                  min="1"
                  step="1"
                  value={blockDays}
                  onChange={(e) =>
                    setBlockDays(
                      e.target.value
                    )
                  }
                  placeholder="Enter number of days"
                  required
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <span className="text-sm font-medium text-slate-500">
                  Days
                </span>

              </div>

              <p className="mt-2 text-xs text-slate-400">
                The block starts immediately after submission.
              </p>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={adding}
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition ${
                adding
                  ? "cursor-not-allowed bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {adding
                ? "Adding..."
                : "Add to Vault"}
            </button>

          </form>

        </div>

        {/* ---------------------------------- */}
        {/* VAULT */}
        {/* ---------------------------------- */}

        <div className="mt-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-slate-900">
              Your Vault
            </h2>

            <span className="text-sm text-slate-400">
              {vaultItems.length}{" "}
              {vaultItems.length === 1
                ? "item"
                : "items"}
            </span>

          </div>

          {loading ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

              <p className="text-sm text-slate-500">
                Loading your vault...
              </p>

            </div>

          ) : vaultItems.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

              <div className="text-3xl">
                🔒
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700">
                Your vault is empty
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add your first app password above.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {vaultItems.map((item) => {

                const blockEndsAt =
                  new Date(
                    item.blockEndsAt
                  ).getTime();

                const accessEndsAt =
                  item.accessEndsAt
                    ? new Date(
                        item.accessEndsAt
                      ).getTime()
                    : null;

                const blockFinished =
                  now >= blockEndsAt;

                const accessWindowActive =
                  accessEndsAt !== null &&
                  now < accessEndsAt;

                const accessAvailable =
                  blockFinished &&
                  (
                    accessEndsAt === null ||
                    now < accessEndsAt
                  );

                let remainingTime = null;

                if (!blockFinished) {
                  remainingTime =
                    Math.max(
                      0,
                      blockEndsAt - now
                    );
                } else if (
                  accessWindowActive
                ) {
                  remainingTime =
                    Math.max(
                      0,
                      accessEndsAt - now
                    );
                }

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >

                    {/* App + Status */}

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.appName}
                        </h3>

                        <p className="mt-2 font-mono text-sm tracking-widest text-slate-500">
                          ••••••••••
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          accessAvailable
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {accessAvailable
                          ? "ACCESS OPEN"
                          : "LOCKED"}
                      </span>

                    </div>

                    {/* ---------------------------------- */}
                    {/* DATE / TIME */}
                    {/* ---------------------------------- */}

                    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">

                        {!blockFinished
                          ? "Password will be available on"
                          : accessWindowActive
                          ? "Access expires on"
                          : "Password available since"}

                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">

                        {!blockFinished
                          ? formatDateTime(
                              item.blockEndsAt
                            )
                          : accessWindowActive
                          ? formatDateTime(
                              item.accessEndsAt
                            )
                          : formatDateTime(
                              item.blockEndsAt
                            )}

                      </p>

                    </div>

                    {/* ---------------------------------- */}
                    {/* TIMER */}
                    {/* ---------------------------------- */}

                    <div className="mt-3 rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">

                        {!blockFinished
                          ? "Time until access"
                          : accessWindowActive
                          ? "Access window remaining"
                          : "Access status"}

                      </p>

                      <p className="mt-1 font-mono text-xl font-bold text-slate-900">

                        {remainingTime !== null
                          ? formatCountdown(
                              remainingTime
                            )
                          : "Waiting for you"}

                      </p>

                    </div>

                    {/* ---------------------------------- */}
                    {/* COPY BUTTON */}
                    {/* ---------------------------------- */}

                    <button
                      type="button"
                      disabled={!accessAvailable}
                      onClick={() =>
                        handleCopy(item)
                      }
                      className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${
                        accessAvailable
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                    >
                      {accessAvailable
                        ? "Copy Password"
                        : "Password Locked"}
                    </button>

                    {/* ---------------------------------- */}
                    {/* DELETE BLOCK */}
                    {/* ---------------------------------- */}

                    {accessAvailable && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteClick(item)
                        }
                        className="mt-3 w-full rounded-lg border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        🗑️ Delete Block
                      </button>
                    )}

                    {/* ---------------------------------- */}
                    {/* MESSAGES */}
                    {/* ---------------------------------- */}

                    {!blockFinished && (
                      <p className="mt-3 text-center text-xs text-amber-600">
                        Password is locked until the block ends.
                      </p>
                    )}

                    {blockFinished &&
                      !accessWindowActive && (
                        <p className="mt-3 text-center text-xs text-emerald-600">
                          Access is available. The 5-minute timer starts when you copy the password.
                        </p>
                    )}

                    {accessWindowActive && (
                      <p className="mt-3 text-center text-xs text-emerald-600">
                        5-minute access window is active.
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* Backend Notice */}

        <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-4">

          <p className="text-xs leading-5 text-indigo-700">
            🔐 Vault data is stored through the RESIDER backend.
            Passwords are encrypted before being stored in MongoDB.
          </p>

        </div>

      </div>

      {/* ================================================== */}
      {/* FIRST DELETE CONFIRMATION POPUP */}
      {/* ================================================== */}

      {showFirstConfirmation && deleteItem && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl">
              ⚠️
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Delete this block?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              You are about to delete the block for{" "}
              <span className="font-semibold text-slate-700">
                {deleteItem.appName}
              </span>.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The stored password and its current block will be removed.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={handleCancelDelete}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleFirstDeleteConfirmation
                }
                className="flex-1 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Continue
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================================== */}
      {/* SECOND DELETE CONFIRMATION POPUP */}
      {/* ================================================== */}

      {showSecondConfirmation && deleteItem && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">

          <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl">
              🗑️
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Are you absolutely sure?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              This action cannot be undone.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The{" "}
              <span className="font-semibold text-slate-700">
                {deleteItem.appName}
              </span>{" "}
              block and stored password will be permanently deleted.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={handleCancelDelete}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleFinalDelete}
                className="flex-1 rounded-lg bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Delete Permanently
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Vault;