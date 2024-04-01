import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
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
                    status: 400
                }
            );
        }

        const { userId } = sessionUser;

        //Find user in DB
        const user = await User.findOne({_id: userId});

        // Check if property is bookmarked already
        let isBookmarked = user.bookmarks.includes(propertyId);

        let message;
        if (isBookmarked) {
            // If already bookmarked, remove from bookmarks
            user.bookmarks.pull(propertyId);
            message = 'Property removed from bookmarks';
            isBookmarked = false;
        } else {
            // If not bookmarked, add to bookmarks
            user.bookmarks.push(propertyId);
            message = 'Property added to bookmarks';
            isBookmarked = true;
        }

        // Save user to DB
        await user.save();

        return new Response(
            JSON.stringify({
                message,
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