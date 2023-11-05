import { connectToDB } from "@utils/database";
import Tournament from "@models/tournament";
import User from "@models/user";

export const dynamic = 'force-dynamic';

export const GET = async ( req ) => {
    try {
        await connectToDB();

        const tournaments = await Tournament.find({}).sort({ start_date:-1 }).populate( 'creator' );

        return new Response(
            JSON.stringify(tournaments),
            {status: 200}
        );
    } catch (error) {
        return new Response(
            "Failed to fetch all tournaments: " + error,
            {status: 500}
        );
    }
}
