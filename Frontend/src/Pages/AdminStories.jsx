import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Filter, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import { adminApi } from "../Services/adminService";
import { getApiOrigin } from "../utils/apiOrigin";

export default function AdminStories() {
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const origin = getApiOrigin();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/admin/stories", {
        params: { status: statusFilter },
      });
      setStories(data.stories ?? []);
    } catch {
      toast.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await adminApi.patch(`/admin/stories/${id}`, { status });
      toast.success(`Story ${status}`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout
      title="Stories"
      subtitle="Review user Hajj/Umrah stories and publish them to the website."
      headerRight={
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 mr-1">
            <Filter className="h-4 w-4" />
            Status
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      }
    >
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-14 text-center text-zinc-500">
            No stories found.
          </div>
        ) : (
          stories.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {s.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {s.type?.toUpperCase()} •{" "}
                    {s.user
                      ? `${s.user.firstName || ""} ${s.user.lastName || ""}`.trim() +
                        ` (${s.user.email})`
                      : "User"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-600">
                    {s.status}
                  </span>
                  <button
                    type="button"
                    disabled={busyId === s._id}
                    onClick={() => setStatus(s._id, "approved")}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === s._id}
                    onClick={() => setStatus(s._id, "rejected")}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              </div>

              {s.videoUrl ? (
                <div className="mt-4">
                  <video
                    controls
                    className="w-full max-h-[360px] aspect-video object-contain rounded-xl border border-zinc-200 bg-black"
                    src={`${origin}${s.videoUrl}`}
                  />
                </div>
              ) : null}

              {s.text ? (
                <p className="mt-4 text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                  {s.text}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}

