import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "clay" | "ghost";
  className?: string;
};

const styles = {
  dark: "bg-evergreen text-cream hover:bg-pine",
  light: "bg-cream text-ink hover:bg-white",
  clay: "bg-clay text-white hover:bg-[#b3704f]",
  ghost: "border border-current/25 text-current hover:bg-current/5",
};

const dot = {
  dark: "bg-cream text-evergreen",
  light: "bg-evergreen text-cream",
  clay: "bg-white text-clay",
  ghost: "bg-current/10",
};

export default function Button({ href, children, variant = "dark", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${dot[variant]}`}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.2} />
      </span>
    </a>
  );
}
