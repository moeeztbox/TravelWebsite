import { Link } from "react-router-dom";

function CopyrightSection() {
  const year = new Date().getFullYear();

  const policyLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-conditions", label: "Terms & Conditions" },
    { to: "/cookie-policy", label: "Cookie Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="text-center md:text-left">
          &copy; {year}{" "}
          <span className="font-semibold">Al Burak International</span>. All
          rights reserved.
        </div>

        <div className="flex gap-4 flex-wrap justify-center md:justify-end">
          {policyLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default CopyrightSection;
