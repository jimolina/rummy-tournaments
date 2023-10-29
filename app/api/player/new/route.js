import { connectToDB } from "@utils/database";
import Player from "@models/player";

export const POST = async ( req ) => {
    const { userId, name, email, avatar } = await req.json();

    try {
        await connectToDB();
        console.log({
            'userId: ': userId,
            'name: ': name,
            'email: ': email,
            'avatar: ': avatar,
        })
        const newPlayer = new Player({
            creator: userId,
            name,
            email,
            avatar
        })

        await newPlayer.save();

        return new Response( JSON.stringify( newPlayer ), { status: 201 } );
    } catch (error) {
        return new Response( "Failed to create a new Player.", { status: 500 } );
    }
}
