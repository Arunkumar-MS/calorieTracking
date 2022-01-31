import axios from "axios";
import cookies from "cookies";

const authAccess = async (ctx: any) => {
    try {
        const ck = new cookies(ctx.req, ctx.res)
        const user = await axios.get('http://localhost:3001/auth/getUser', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ck.get('token') || '',
            }
        });
        return {
            props: { user: { ...user.data, userId: user.data['_id'] } },
        }
    } catch (e) {
        const { res } = ctx;
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {
            props: {},
        }
    }
}

export default authAccess;