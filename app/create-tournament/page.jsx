"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import TournamentForm from '@components/TournamentsForm';

const CreateTournament = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [ submitting, setSubmitting ] = useState( false );
    const [ post, setPost ] = useState({
        name: '',
        start_date: '',
    });

    const createTournament = async ( e ) => {
        e.preventDefault();
        setSubmitting( true );

        try {
            const response = await fetch(
                '/api/tournament/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: post.name,
                        start_date: post.start_date,
                        userId: session?.user.id,
                    }),
                }
            );

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <TournamentForm
        type="Create"
        area="Tournament"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createTournament}
    />
  )
}

export default CreateTournament