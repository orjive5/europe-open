import { getAwards } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";

export const useAwardsQuery = () => {
    return useQuery({
        queryKey: ['awards'],
        queryFn: getAwards,
        refetchOnWindowFocus: false,
    });
};