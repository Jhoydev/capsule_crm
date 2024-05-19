// /components/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside style={{ width: '250px', padding: '20px', backgroundColor: '#e0e0e0' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link href="/properties">Propiedades</Link></li>
                <li><Link href="/users">Usuarios</Link></li>
                <li><Link href="/contacts">Contactos</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
