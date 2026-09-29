import Link from "next/link";

function CopyrightSection() {
  const year = new Date().getFullYear();

  const policyLinks = [
    { to: "/coming-soon", label: "Privacy Policy" },
    { to: "/coming-soon", label: "Refund Policy" },
    { to: "/coming-soon", label: "Terms & Conditions" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-6 px-4">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="text-center md:text-left">
          &copy; {year}{" "}
          <span className="font-semibold">Al Buraq Pilgrim</span>. All
          rights reserved.
        </div>

        <div className="flex gap-4 flex-wrap justify-center md:justify-end">
          {policyLinks.map(({ to, label }) => (
            <Link
              key={label}
              href={to}
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
