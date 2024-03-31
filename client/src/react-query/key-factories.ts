import { queryKeys } from "./constants";

export const generateUserKey = (userId: number, userToken?: string) => {
    // Delibaretly exclude userToken from dependency array
    // Aim to keep the key consistent for userId
    return [queryKeys.user, userId];
};

export const generateUserAppointmentsKey = (userId: number, userToken: string) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken];
};