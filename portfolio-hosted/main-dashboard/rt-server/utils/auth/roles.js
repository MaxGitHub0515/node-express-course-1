
export function isAdmin(user) {
    return user.username === process.env.ADMIN_ROLE;

}

