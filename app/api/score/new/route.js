import { connectToDB } from "@utils/database";
import Score from "@models/score";

export const POST = async ( req ) => {
    const { userId, tournament, date, scores } = await req.json();
    
    try {
        await connectToDB();

        const newScores = new Score({
            creator: userId,
            tournament,
            date
        });

        newScores.scores = scores;
        
        await newScores.save();

        return new Response( JSON.stringify( newScores ), { status: 201 } );
    } catch (error) {
        return new Response( "Failed to create a new Scores.", { status: 500 } );
    }
}