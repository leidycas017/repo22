import Link from "next/link";

interface NavigationCardProps {
  title: string;
  href: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const NavigationCard = ({
  title,
  href,
  isSelected,
  onClick,
}: NavigationCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      } navigation-card border border-gray-300 w-full h-314 cursor-pointer`}
    >
      <Link href={href}>
        <div className="flex flex-col items-center font-semibold">
          <h3>{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export { NavigationCard };
