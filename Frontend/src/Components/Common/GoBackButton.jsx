import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton({
  fallbackTo = "/",
  className = "",
  label = "Go back",
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else navigate(fallbackTo);
      }}
      className={[
        "inline-flex items-center gap-2 text-sm font-semibold",
        "text-stone-700 hover:text-stone-900 hover:bg-stone-100",
        "px-3 py-2 rounded-xl transition",
        className,
      ].join(" ")}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}

