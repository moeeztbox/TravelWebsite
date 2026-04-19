import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import { api } from "../Services/authService";
import { getApiOrigin } from "../utils/apiOrigin";
import ReasonDialog from "../Components/Admin/ReasonDialog";

export default function AdminStories() {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const origin = getApiOrigin();
  const [tab, setTab] = useState("stories"); // stories | reviews
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    id: null,
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/stories", { params: { status: "all" } });
      setStories(data.stories ?? []);
    } catch {
      toast.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id) => {
    setBusyId(id);
    try {
      await api.patch(`/admin/stories/${id}`, { status: "approved" });
      toast.success("Approved");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const openReject = (id) => setRejectDialog({ open: true, id });

  const confirmReject = async (reason) => {
    const id = rejectDialog.id;
    if (!id) {
      setRejectDialog({ open: false, id: null });
      return;
    }
    setBusyId(id);
    try {
      await api.patch(`/admin/stories/${id}`, {
        status: "rejected",
        rejectionReason: String(reason || "").trim(),
      });
      toast.success("Rejected");
      setRejectDialog({ open: false, id: null });
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setBusyId(id);
    try {
      await api.delete(`/admin/stories/${id}`);
      toast.success("Removed");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  // Backward-compat: older items don't have `kind`. Those were submitted via the old "SubmitStory" page
  // which functioned as a "review" form (rating + review text), so treat missing kind as review.
  const kindOf = (s) => (s.kind ? (s.kind === "review" ? "review" : "story") : "review");
  const storiesOnly = useMemo(
    () => stories.filter((s) => kindOf(s) === "story"),
    [stories]
  );
  const reviewsOnly = useMemo(
    () => stories.filter((s) => kindOf(s) === "review"),
    [stories]
  );

  const byStatus = useCallback((rows, st) => rows.filter((s) => s.status === st), []);

  const counts = useCallback(
    (rows) => ({
      all: rows.length,
      pending: byStatus(rows, "pending").length,
      approved: byStatus(rows, "approved").length,
      rejected: byStatus(rows, "rejected").length,
    }),
    [byStatus]
  );

  const storiesCount = useMemo(() => counts(storiesOnly), [counts, storiesOnly]);
  const reviewsCount = useMemo(() => counts(reviewsOnly), [counts, reviewsOnly]);

  const CountPill = ({ label, value, tone }) => (
    <span
      className={[
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-white",
        tone === "all"
          ? "border-zinc-200 text-zinc-700"
          : tone === "pending"
            ? "border-amber-200 text-amber-800 bg-amber-50/40"
            : tone === "approved"
              ? "border-emerald-200 text-emerald-800 bg-emerald-50/40"
              : "border-red-200 text-red-800 bg-red-50/40",
      ].join(" ")}
    >
      {label}
      <span className="px-2 py-0.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700">
        {value}
      </span>
    </span>
  );

  const StoryCard = ({ s }) => (
    <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">{s.title}</p>
          <p className="text-xs text-zinc-500 mt-1">
            {String(kindOf(s)).toUpperCase()} • {s.type?.toUpperCase()} •{" "}
            {s.user
              ? `${s.user.firstName || ""} ${s.user.lastName || ""}`.trim() +
                ` (${s.user.email})`
              : "User"}
          </p>
          {s.displayName || s.username || s.location ? (
            <p className="text-xs text-zinc-600 mt-1">
              {[s.displayName, s.username, s.location].filter(Boolean).join(" • ")}
              {kindOf(s) === "review" ? ` • Rating: ${Number(s.rating) || 5}/5` : ""}
            </p>
          ) : kindOf(s) === "review" ? (
            <p className="text-xs text-zinc-600 mt-1">
              Rating: {Number(s.rating) || 5}/5
            </p>
          ) : null}
          {s.status === "rejected" && s.rejectionReason ? (
            <p className="text-xs text-red-700 mt-1">
              Rejected reason: {s.rejectionReason}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-600">
            {s.status}
          </span>
          {s.status === "pending" ? (
            <>
              <button
                type="button"
                disabled={busyId === s._id}
                onClick={() => approve(s._id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-60"
                title="Approve"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </button>
              <button
                type="button"
                disabled={busyId === s._id}
                onClick={() => openReject(s._id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>
            </>
          ) : null}
          <button
            type="button"
            disabled={busyId === s._id}
            onClick={() => remove(s._id)}
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            title="Remove"
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
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
  );

  return (
    <AdminLayout
      title="Stories"
      subtitle="Review user Hajj/Umrah stories and publish them to the website."
      headerRight={null}
    >
      <ReasonDialog
        open={rejectDialog.open}
        title="Reject item"
        description="Enter rejection reason (optional)."
        confirmText="OK"
        hideCancel={true}
        busy={busyId === rejectDialog.id}
        onCancel={() => setRejectDialog({ open: false, id: null })}
        onConfirm={confirmReject}
      />

      <div className="space-y-6">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto" />
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-14 text-center text-zinc-500">
            No stories found.
          </div>
        ) : (
          <>
            <div className="border-b border-zinc-200 flex gap-2">
              <button
                type="button"
                onClick={() => setTab("stories")}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 -mb-px transition-colors ${
                  tab === "stories"
                    ? "border-amber-500 text-amber-900 bg-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                User Stories
              </button>
              <button
                type="button"
                onClick={() => setTab("reviews")}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 -mb-px transition-colors ${
                  tab === "reviews"
                    ? "border-amber-500 text-amber-900 bg-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                User Reviews
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-100 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900">
                    {tab === "stories" ? "User Stories" : "User Reviews"}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {tab === "stories"
                      ? "Approve/reject stories, then they stay here (only dustbin remains)."
                      : "Approve/reject reviews, then they stay here (only dustbin remains)."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CountPill
                    label="All"
                    value={tab === "stories" ? storiesCount.all : reviewsCount.all}
                    tone="all"
                  />
                  <CountPill
                    label="Pending"
                    value={tab === "stories" ? storiesCount.pending : reviewsCount.pending}
                    tone="pending"
                  />
                  <CountPill
                    label="Approved"
                    value={tab === "stories" ? storiesCount.approved : reviewsCount.approved}
                    tone="approved"
                  />
                  <CountPill
                    label="Rejected"
                    value={tab === "stories" ? storiesCount.rejected : reviewsCount.rejected}
                    tone="rejected"
                  />
                </div>
              </div>

              <div className="p-5 space-y-5">
                {(() => {
                  const list = tab === "stories" ? storiesOnly : reviewsOnly;
                  const pending = byStatus(list, "pending");
                  const approved = byStatus(list, "approved");
                  const rejected = byStatus(list, "rejected");
                  if (!list.length) {
                    return (
                      <div className="py-10 text-center text-sm text-zinc-500">
                        No {tab === "stories" ? "stories" : "reviews"} found.
                      </div>
                    );
                  }
                  return (
                    <>
                      {pending.length ? (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-zinc-600">Pending</p>
                          <div className="grid grid-cols-1 gap-4">
                            {pending.map((s) => (
                              <StoryCard key={s._id} s={s} />
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {approved.length ? (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-zinc-600">Approved</p>
                          <div className="grid grid-cols-1 gap-4">
                            {approved.map((s) => (
                              <StoryCard key={s._id} s={s} />
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {rejected.length ? (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-zinc-600">Rejected</p>
                          <div className="grid grid-cols-1 gap-4">
                            {rejected.map((s) => (
                              <StoryCard key={s._id} s={s} />
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

