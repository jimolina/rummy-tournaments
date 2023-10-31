import { connectToDB } from "@utils/database";
import Tournament from "@models/tournament";

export const POST = async ( req ) => {
    const { userId, name, start_date } = await req.json();

    try {
        await connectToDB();

        const newTournament = new Tournament({
            creator: userId,
            name,
            start_date,
        })

        await newTournament.save();

        return new Response( JSON.stringify( newTournament ), { status: 201 } );
    } catch (error) {
        return new Response( "Failed to create a new Tournament.", { status: 500 } );
    }
}