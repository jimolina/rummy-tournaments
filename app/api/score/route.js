import { connectToDB } from "@utils/database";
import Scores from "@models/score";

export const GET = async ( req ) => {
    try {
        await connectToDB();

        const scores = await Scores.find({})
            .exists('tournament', true)
            .sort({ date:-1 })
            .populate( 'creator' )
            .populate( {path: 'tournament', select: 'name'} )
            .populate( {path: 'scores.player', select: 'name email' } );

        return new Response(
            JSON.stringify(scores),
            {status: 200}
        );
    } catch (error) {
        return new Response(
            "Failed to fetch all scores",
            {status: 500}
        );
    }
}
