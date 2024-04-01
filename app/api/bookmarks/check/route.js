import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    try {
        await connectDB();
        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response(
                'User Id is required', {
                    status: 401
                }
            );
        }

        const { userId } = sessionUser;

        //Find user in DB
        const user = await User.findOne({_id: userId});

        // Check if property is bookmarked already
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(
            JSON.stringify({
                isBookmarked
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    } catch (error) {
        console.log(error);
        return new Response(
            'An error occurred. Please try again.', {
                status: 500
            }
        );
    }
};