import type { Appointment } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { generateUserAppointmentsKey } from "@/react-query/key-factories";
import { useLoginData } from "@/auth/AuthContext";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();
  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken)
  });

  return userAppointments;
}
