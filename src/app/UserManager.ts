import { APIConfiguration } from "@twit2/std-library-fe";
import { assertResponse, sendAPIRequest } from "@twit2/std-library-fe";
import { PaginatedAPIData } from "@twit2/std-library-fe";
import { PartialUser } from "@twit2/std-library-fe";
import { AppContext } from "./AppContext";
import { ObjectStores } from "./ObjectStores";

export const USER_ENDPOINT = `/user`;

/**
 * Gets a user by ID.
 * @param id The ID of the user to get.
 * @returns The user.
 */
async function getUserById(id: string) {
    return ObjectStores.user.get(id);
}

/**
 * Gets a user by name.
 * @param username The username of the user to get.
 * @returns The user.
 */
async function getUserByName(username: string) {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@${username}`, "GET"), {
        dataRequired: true
    });

    return ObjectStores.user.update(userResp.data as PartialUser);
}

/**
 * Gets the currently logged in user.
 */
async function getCurrentUser() {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@me`, "GET"), {
        dataRequired: true
    });

    AppContext.currentUser = ObjectStores.user.update(userResp.data as PartialUser);
    return AppContext.currentUser;
}

/**
 * Gets the latest user profiles.
 * @param page The page of profiles to retrieve.
 */
async function getLatestProfiles(page: number): Promise<PaginatedAPIData<PartialUser>> {
    const usersResp : PaginatedAPIData<PartialUser> = assertResponse(await sendAPIRequest<PaginatedAPIData<PartialUser>>(`${USER_ENDPOINT}/latest/${page}`, "GET"), {
        dataRequired: true
    }).data as PaginatedAPIData<PartialUser>;

    usersResp.data?.map(x => ObjectStores.user.update(x));
    return usersResp;
}

/**
 * Returns an avatar URL.
 */
function getAvatarURL(user: PartialUser): string|undefined {
    if(user.avatarURL)
        return `${APIConfiguration.apiCdnUrl}${user.avatarURL}`;
}

/**
 * [admin] Sets the verification status of a user.
 * @param id The ID of the user.
 * @param verified Sets whether a user should be verified.
 */
async function setVerified(id: string, verified: boolean) {
    const verifyResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/${id}/verify`, 'POST', {
        verified
    }));

    return ObjectStores.user.update(verifyResp.data as PartialUser);
}

export const UserManager = {
    getLatestProfiles,
    getCurrentUser,
    getUserByName,
    getUserById,
    getAvatarURL,
    setVerified
}