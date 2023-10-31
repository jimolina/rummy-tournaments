"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import ScoreForm from '@components/ScoresForm';

const CreateScore = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [ submitting, setSubmitting ] = useState( false );
    const [ players, setPlayers ] = useState([]);
    const [ tournaments, setTournaments ] = useState([]);

    useEffect(() => {
      const fetchPlayers = async () => {
        const response = await fetch( '/api/player/list' );
        const data = await response.json();
    
        setPlayers( data );
      }
    
      fetchPlayers();
    }, []);

    useEffect(() => {
        const fetchTournaments = async () => {
          const response = await fetch( '/api/tournament' );
          const data = await response.json();
          setTournaments( data );
        }
      
        fetchTournaments();
      }, []);

    const [ post, setPost ] = useState({
        tournaments: '',
        date: new Date().toISOString().substring(0,10),
    });

    const createScore = async ( e ) => {
        e.preventDefault();
        setSubmitting( true );

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        let finalData = [];
        const newVal = Object.entries(formJson).map(([player, score], i) => {
            finalData.push(
                {
                    player,
                    score,
                }
            )
        });

        try {
            const response = await fetch(
                '/api/score/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        scores: finalData,
                        tournament: post.tournaments,
                        date: post.date,
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
    <ScoreForm
        type="Create"
        area="Score"
        post={post}
        players={players}
        tournaments={tournaments}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createScore}
    />
  )
}

export default CreateScore;