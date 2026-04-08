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
    in_makkah: "In Makkah",
    in_madinah: "In Madinah",
    return_flight: "Return flight",
    completed: "Completed",
  };
  return map[stage] || stage || "Not started";
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
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/80">
                <th className="px-4 py-3 font-medium text-zinc-600">User</th>
                <th className="px-4 py-3 font-medium text-zinc-600">Package</th>
                <th className="px-4 py-3 font-medium text-zinc-600">Start</th>
                <th className="px-4 py-3 font-medium text-zinc-600">Stage</th>
                <th className="px-4 py-3 font-medium text-zinc-600 w-56">
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
                scheduled.map((b) => (
                  (() => {
                    const startMs = b.journey?.startAt
                      ? new Date(b.journey.startAt).getTime()
                      : NaN;
                    const startReached = Number.isFinite(startMs) && now >= startMs;
                    const disabled = busyId === b._id || !startReached;

                    return (
                  <tr
                    key={b._id}
                    className="border-b border-zinc-50 hover:bg-zinc-50/50"
                  >
                    <td className="px-4 py-3 text-zinc-900 font-medium">
                      {userLabel(b.user)}
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      <div className="font-medium">{b.packageTitle}</div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {b.packageId}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-700 whitespace-nowrap">
                      {b.journey?.startAt
                        ? new Date(b.journey.startAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {stageLabel(b.journey?.stage)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        disabled={disabled}
                        value={b.journey?.stage || "not_started"}
                        onChange={(e) => updateStage(b._id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="flight_takeoff">Flight takeoff</option>
                        <option value="in_makkah">In Makkah</option>
                        <option value="in_madinah">In Madinah</option>
                        <option value="return_flight">Return flight</option>
                        <option value="completed">Completed</option>
                      </select>
                      {!startReached ? (
                        <p className="mt-1 text-[11px] text-zinc-400">
                          Available after start time.
                        </p>
                      ) : null}
                    </td>
                  </tr>
                    );
                  })()
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

