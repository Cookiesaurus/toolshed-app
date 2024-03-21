export const sessionOptions = {
    password: process.env.SECRET_KEY,
    cookieName: "seac-session",
    cookieOptions: { httpOnly: true, secure: true },
};

export const defaultSession = {
    isLoggedIn: false,
    accId: undefined
}
