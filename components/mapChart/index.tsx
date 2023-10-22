'use client'

import { Chart } from "react-google-charts";
import { useTheme } from "next-themes"
import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "@/sanity/sanity-utils";
import { IParticipantData } from "@/types/participantData.interface";
import { Skeleton } from "../ui/skeleton";

export function MapChart() {
    const { theme } = useTheme();
    const {data, isLoading, isError } = useQuery({
        queryKey: ['participants'],
        queryFn: getParticipants,
    });

    // Calculate number of participants from each country
    function countCountries(array: IParticipantData[]) {
        const countryCountMap: { [country: string]: number } = {};
        
        for (const item of array) {
            const country = item.country;
            countryCountMap[country] 
            ? countryCountMap[country]++ 
            : countryCountMap[country] = 1        
        }
        
        const result = Object.entries(countryCountMap).map(([country, count]) => [country, count]);
        return [["Country", "Number of participants"], ...result]
    }

    const originalWarn = console.warn;

    // Ignore console warning
    console.warn = function (...args) {
        const arg = args && args[0];
    
        if (arg && arg.includes('Attempting to load version \'51\' of Google Charts')) return;
        if (arg && arg.includes('Google Maps JavaScript API has been loaded directly without a callback')) return;
    
        originalWarn(...args);
    };

    return (
        <section className="w-full xl:w-5/6 flex flex-col justify-center items-center gap-8">
            <h1 className="sm:text-xl font-medium">
                Participant's Geography
            </h1>
            {data 
                && (<Chart
                        width='100%'
                        chartType="GeoChart"
                        data={countCountries(data)}
                        mapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                        options={{
                            backgroundColor: `${theme === 'dark' ? '#0c0a09' : 'white'}`,
                            datalessRegionColor: "#f5f5f5",
                            defaultColor: "#f5f5f5",
                            colorAxis: { colors: ["#FAE4D4", "#F97316"] },
                            legend: false,
                            keepAspectRatio: true
                        }}
                    />)
            }
            {
                isLoading && <Skeleton className="w-full h-[300px] xl:h-[700px]" />
            }
            {
                isError && 
                    <h2 className="text-center">
                        Something went wrong...
                    </h2>
            }
        </section>
    );
}
