const redirectTo = (path: string, ctx: any) => {
    const { res } = ctx;
    res.setHeader("location", path);
    res.statusCode = 302;
    res.end();
}

const redirectTo404 = (ctx: any) => {
    const { res } = ctx;
    res.setHeader("location", '/_error');
    res.statusCode = 302;
    res.end();
}

export {
    redirectTo,
    redirectTo404
}