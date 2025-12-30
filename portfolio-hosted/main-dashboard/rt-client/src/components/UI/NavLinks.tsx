

import type { NavLinksProps } from "../../types"
import { Link } from "react-router-dom";

const NavLinks = ({ items, containerStyles, linkStyles, buttonStyles, onLinkClick }: NavLinksProps) => {
    return (
        <div className={containerStyles}>
            {items.map((item) => (
                <Link 
                    key={item.label}
                    to={item.path} 
                    onClick={onLinkClick}
                    className={item.isButton && buttonStyles ? buttonStyles : linkStyles}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;