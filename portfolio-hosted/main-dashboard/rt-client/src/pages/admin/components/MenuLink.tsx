

import { Link } from "react-router-dom";


interface MenuLinkProps {
    to: string,
    title: string,
    children: React.ReactNode
}
export function MenuLink({ to, title, children }: MenuLinkProps) {
  return (
    <li>
    <Link
      to={to}
      className="text-gray-700 hover:text-green-600 transition-colors duration-200"
      title={title}
    >
      {children}
    </Link>
    </li>
  );
}