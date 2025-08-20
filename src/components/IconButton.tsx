export default function IconButton({
    children,
    onClick,
    ariaLabel,
    variant = "ghost",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    ariaLabel: string;
    variant?: "ghost" | "danger";
  }) {
    const base = "rounded p-1 transition";
    const styles =
      variant === "danger"
        ? "text-red-600 hover:bg-red-50"
        : "hover:bg-gray-100";
    return (
      <button
        onClick={onClick}
        className={`${base} ${styles}`}
        aria-label={ariaLabel}
        title={ariaLabel} // tooltip on hover
      >
        {children}
      </button>
    );
  }
  