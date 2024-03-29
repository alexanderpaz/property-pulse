import connectDB from "@/config/database";

export const GET = async (request) => {
    try {
        await connectDB();

        return new Response(JSON.stringify({ message: 'Hello World'}), { status: 200 });
    } catch (error) {
        console.log('Error: ', error);
        return new Response('An error occurred', { status: 500 });
    }
}