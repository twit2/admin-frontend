import { assertResponse, sendAPIRequest } from "@twit2/std-library-fe";

export const AUTH_ENDPOINT = `/auth`;

/**
 * Logs into the twit2 application.
 * @param username The username of the user to use.
 * @param password The password of the user to use.
 */
async function login(username: string, password: string) {
    // Give UI a proper error message.
    if(username.trim() === "")
        throw new Error('No username specified.');
    else if(password.trim() === "")
        throw new Error('No password specified.');

    // Get response
    const loginResp = assertResponse(await sendAPIRequest<string>(`${AUTH_ENDPOINT}/login`, "POST", {
        username,
        password
    }));

    localStorage.setItem('auth-token', loginResp.data as string);
}

export const AuthManager = {
    login
}