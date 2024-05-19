// /components/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className='bg-slate-100 w-64 p-5'>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li className='m-5'><Link href="/properties">Propiedades</Link></li>
                <li className='m-5'><Link href="/users">Usuarios</Link></li>
                <li className='m-5'><Link href="/contacts">Contactos</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
