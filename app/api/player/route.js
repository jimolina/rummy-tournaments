import { connectToDB } from "@utils/database";
import Player from "@models/player";
import Scores from "@models/score";

export const GET = async ( req ) => {
    try {
        await connectToDB();

        const players = await Scores.aggregate([
            {
                $unwind: {
                    path: "$scores"
                }
            },
            {
                $project: {
                    "scores": 1,
                    "_id": 0
                }
            },
            {
                $group: {
                    _id: "$scores.player",
                    count: {
                        $sum: "$scores.score"
                    }
                }
            },
            { 
                $sort: { 
                    "count": 1 
                }
            },
            {
                $lookup: {
                    from: "players",
                    localField: "_id",
                    foreignField: "_id",
                    as: "fromPlayers"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                    $mergeObjects: [
                        {
                        $arrayElemAt: [
                            "$fromPlayers",
                            0
                        ]
                        },
                        "$$ROOT"
                    ]
                    }
                }
            },
            {
                $project: {
                    fromPlayers: 0,
                    creator: 0,
                    avatar: 0
                }
            }
        ]);
        
        // const players = await Player.find({})
        //     .sort({ name:1 })
        //     .populate( 'creator' );

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
