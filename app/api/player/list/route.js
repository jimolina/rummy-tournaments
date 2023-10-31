import { connectToDB } from "@utils/database";
import Player from "@models/player";

export const GET = async ( req ) => {
    try {
        await connectToDB();

        const players = await Player.find({})
            .sort({ name:1 })
            .populate( 'creator' );

        return new Response(
            JSON.stringify(players),
            {status: 200}
        );
    } catch (error) {
        return new Response(
            "Failed to fetch all players",
            {status: 500}
        );
    }
}
