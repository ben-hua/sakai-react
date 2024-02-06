'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';

export default function UserPopupButton() {
    const { data: session, status } = useSession()
    const menuRight = useRef<Menu>(null);
    const userName = session?.user?.name || ''
    const items: MenuItem[] = [
        {
            label: (session?.user?.email) || '',
            items: [
            ]
        }
    ];


    const pathname = usePathname();
    console.log('UserPopupButton.url: ', pathname)
    if (session?.user) {
        items.push({
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                signOut({ callbackUrl: `http://localhost:3000${pathname}` })
            }
        });
    } else {
        items.push({
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: () => {
                signIn('keycloak');
            }
        });
    }

    return (
        <>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            <Button label={userName} icon="pi pi-user" rounded text severity="secondary" aria-label="User"
                onClick={(event) => menuRight.current?.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
        </>
    )
}
