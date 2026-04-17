import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../Components/Admin/AdminLayout";
import { adminListBookings, adminSetJourneyStage } from "../Services/adminService";

function userLabel(user) {
  if (!user) return "Unknown user";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name ? `${name} (${user.email})` : user.email || "Unknown user";
}

function stageLabel(stage) {
  const map = {
    not_started: "Not started",
    scheduled: "Scheduled",
    flight_takeoff: "Flight takeoff",
    jeddah_airport: "Jeddah airport",
    in_jeddah: "In Jeddah",
    ziyarat: "Ziyarat",
    in_makkah: "In Makkah",
    in_madinah: "In Madinah",
    makkah_airport: "Makkah airport",
    return_flight: "Return flight",
    completed: "Completed",
  };
  return map[stage] || stage || "Not started";
}

function stageOptionsForBooking(booking) {
  const plan = Array.isArray(booking?.journey?.plan) ? booking.journey.plan : [];
  const cleaned = plan
    .map((s) => String(s || "").trim())
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  if (cleaned.length === 0) {
    const cur = booking?.journey?.stage || "not_started";
    return [{ id: cur, label: stageLabel(cur) }];
  }
  return cleaned.map((id) => ({ id, label: stageLabel(id) }));
}

export default function AdminUserStatuses() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const bookings = await adminListBookings("all");
      setRows(bookings);
    } catch {
      toast.error("Failed to load user statuses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const scheduled = useMemo(
    () =>
      rows.filter(
        (b) =>
          b.status === "approved" &&
          b.payment?.status === "verified" &&
          b.journey?.startAt
      ),
    [rows]
  );

  const cardRows = useMemo(() => {
    return scheduled.map((b) => {
      const startMs = b.journey?.startAt ? new Date(b.journey.startAt).getTime() : NaN;
      const startReached = Number.isFinite(startMs) && now >= startMs;
      const disabled = busyId === b._id || !startReached;
      return { b, startReached, disabled };
    });
  }, [scheduled, now, busyId]);

  const updateStage = async (id, stage) => {
    setBusyId(id);
    try {
      await adminSetJourneyStage(id, stage);
      toast.success("Status updated");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout
      title="User Statuses"
      subtitle="Users appear here after payment is verified and a start date is scheduled."
    >
      {/* Mobile: card list */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-5 py-10 text-center text-zinc-500">
            Loading…
          </div>
        ) : cardRows.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-5 py-10 text-center text-zinc-500">
            No users scheduled yet.
          </div>
        ) : (
          cardRows.map(({ b, startReached, disabled }) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-zinc-100">
                <div className="text-sm font-semibold text-zinc-900">
                  {userLabel(b.user)}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {b.packageTitle}{" "}
                  <span className="font-mono text-[11px] text-zinc-400">
                    ({b.packageId})
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500">Start</div>
                  <div className="text-xs text-zinc-700 text-right">
                    {b.journey?.startAt
                      ? new Date(b.journey.startAt).toLocaleString()
                      : "—"}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500">Current stage</div>
                  <div className="text-xs font-medium text-zinc-800">
                    {stageLabel(b.journey?.stage)}
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-100">
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Update stage
                  </label>
                  <select
                    disabled={disabled}
                    value={b.journey?.stage || "not_started"}
                    onChange={(e) => updateStage(b._id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60"
                  >
                    {stageOptionsForBooking(b).map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {!startReached ? (
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Available after start time.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop/tablet: table */}
      <div className="hidden sm:block bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/80">
                <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                  User
                </th>
                <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                  Package
                </th>
                <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">
                  Start
                </th>
                <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Stage
                </th>
                <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide w-56">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-zinc-500">
                    Loading…
                  </td>
                </tr>
              ) : scheduled.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-zinc-500">
                    No users scheduled yet.
                  </td>
                </tr>
              ) : (
                scheduled.map((b) => {
                  const startMs = b.journey?.startAt
                    ? new Date(b.journey.startAt).getTime()
                    : NaN;
                  const startReached = Number.isFinite(startMs) && now >= startMs;
                  const disabled = busyId === b._id || !startReached;
                  return (
                    <tr
                      key={b._id}
                      className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-zinc-900 font-medium">
                        {userLabel(b.user)}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-700">
                        <div className="font-medium">{b.packageTitle}</div>
                        <div className="text-xs text-zinc-500 font-mono">
                          {b.packageId}
                        </div>
                        <div className="md:hidden mt-1 text-xs text-zinc-500">
                          <span className="font-medium text-zinc-700">Start:</span>{" "}
                          {b.journey?.startAt
                            ? new Date(b.journey.startAt).toLocaleString()
                            : "—"}
                          <span className="mx-2 text-zinc-300">•</span>
                          <span className="font-medium text-zinc-700">Stage:</span>{" "}
                          {stageLabel(b.journey?.stage)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-700 whitespace-nowrap hidden md:table-cell">
                        {b.journey?.startAt
                          ? new Date(b.journey.startAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-700 hidden lg:table-cell">
                        {stageLabel(b.journey?.stage)}
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          disabled={disabled}
                          value={b.journey?.stage || "not_started"}
                          onChange={(e) => updateStage(b._id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60"
                        >
                          {stageOptionsForBooking(b).map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {!startReached ? (
                          <p className="mt-1 text-[11px] text-zinc-400">
                            Available after start time.
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

