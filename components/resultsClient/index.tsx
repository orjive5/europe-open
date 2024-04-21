'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getResults } from "@/sanity/sanity-utils"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ExternalLink } from "lucide-react"
import { Result } from "@/types/result.interface"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { additionalResultsLinks } from "@/constants/additionalResultsLinks"

const FormSchema = z.object({
  competitive_year: z
    .string({
      required_error: "Please select a year.",
    })
})

const ResultsClient = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data, isError } = useQuery({
    queryKey: ['results'],
    queryFn: getResults,
  });

  const [chosenResults, setChosenResults] = useState<Result[] | null>(null);

  const competitiveYears = [...new Set(data?.map(item => item.competitive_year))];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { setValue, control, handleSubmit, watch } = form;

  const selectedYear = watch('competitive_year');

  useEffect(() => {
    const yearFromURL = searchParams.get('year');
    if (yearFromURL && data) {
      const yearFromUrlData = data.filter(item => String(item.competitive_year) === yearFromURL);
      if (yearFromUrlData) {
        setValue('competitive_year', String(yearFromUrlData?.[0]?.competitive_year));
      }
      setChosenResults(yearFromUrlData);
    }
  }, [data])

  function onSubmit(value: z.infer<typeof FormSchema>) {
    const chosenYear = data?.filter(item => item.competitive_year === Number(value.competitive_year));
    const params = new URLSearchParams(searchParams);
    if (chosenYear) {
      params.set('year', String(chosenYear[0].competitive_year))
    } else {
      params.delete('year')
    }
    replace(`${pathname}?${params.toString()}`);
    setChosenResults(chosenYear || null);
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      {isError ?
        (<h2>
          Something went wrong, please, reload and try again.
        </h2>) : (
          <>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
                  name="competitive_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Year
                      </FormLabel>
                      <Select onValueChange={(e) => {
                        setChosenResults(null)
                        field.onChange(e)
                      }} value={selectedYear || field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a year to download results' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {competitiveYears && competitiveYears.map(item => {
                            return (
                              <SelectItem key={item} value={`${item}`}>
                                {item}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Please, select a competitive year to download results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Get results
                </Button>
              </form>
            </Form>
            {chosenResults && (
              <div className="flex flex-col justify-start align-center gap-4">
                {chosenResults.map(item => {
                  return (
                    <div key={item._id} className="styled-link-parent flex gap-2">
                      <ExternalLink className="text-primary" />
                      <a
                        href={item.results}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                    </div>
                  )
                })}
                {additionalResultsLinks.map(item => {
                  return (
                    <div className="styled-link-parent flex gap-2">
                      <ExternalLink className="text-primary" />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                    </div>
                  )
                })}
              </div>
            )}

          </>
        )
      }
    </div>
  )
}

export default ResultsClient;