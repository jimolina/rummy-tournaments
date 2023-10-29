"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import PlayerForm from '@components/PlayersForm';

const CreatePlayer = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [ submitting, setSubmitting ] = useState( false );
    const [ post, setPost ] = useState({
        name: '',
        email: '',
        avatar: '',
    })

    const createPlayer = async ( e ) => {
        e.preventDefault();
        setSubmitting( true );

        try {
            const response = await fetch(
                '/api/player/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: post.name,
                        email: post.email,
                        avatar: post.avatar,
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
    }

  return (
    <PlayerForm
        type="Create"
        area="Player"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPlayer}
    />
  )
}

export default CreatePlayer