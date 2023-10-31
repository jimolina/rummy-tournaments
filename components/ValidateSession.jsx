import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export const ValidateSession = () => {
    const { data: session } = useSession();

    if ( ! session?.user ) {
        redirect('/');
    }
}
