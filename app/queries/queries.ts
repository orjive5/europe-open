import { getAward, getAwards, getNews, getNewsArticle } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";

export const useAwardsQuery = () => {
    return useQuery({
        queryKey: ['awards'],
        queryFn: getAwards,
        refetchOnWindowFocus: false,
    });
};

export const useNewsQuery = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: getNews,
        refetchOnWindowFocus: false,
    });
};

export const useAwardQuery = ({ params }: any) => {
    return useQuery(
        ['award', params],
        () => getAward(params.award)
    )
};

export const useNewsArticleQuery = ({ params }: any) => {
    return useQuery(
        ['news', params],
        () => getNewsArticle(params.news)
    )
};