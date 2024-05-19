// /components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import Navigation from "@/components/structure/navigation";
import React from "react";
import {useAuth} from "@/hooks/auth";
import Loading from "@/components/shared/Loading";


const Header = () => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <header>
            <Navigation user={user} />
        </header>
    );
};

export default Header;
