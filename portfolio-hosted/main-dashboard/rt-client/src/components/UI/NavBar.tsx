

// interface NavBarProps {
//     links?: { label: string; href: string }[];
// }

// const defaultLinks = [
//     { label: 'Main Dashboard', href: '/main-dashboard' },
//     { label: 'Contact', href: '/contact' },
// ];

// const NavBar: React.FC<NavBarProps> = ({ links = defaultLinks }) => (
//     <nav style={{ padding: '1rem', background: '#222', color: '#fff' }}>
//         <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
//             {links.map((link) => (
//                 <li key={link.href}>
//                     <a href={link.href} style={{ color: '#fff', textDecoration: 'none' }}>
//                         {link.label}
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     </nav>
// );

// export default NavBar;