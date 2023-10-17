'use client'

import ParticipantPreview from "@/components/participantPreview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getDisciplines, getParticipants } from "@/sanity/sanity-utils";
import { IParticipantData } from "@/types/participantData.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  competitive_year: z.string(),
  discipline: z.string(),
  searchByName: z.string().max(50),
});

const Participants = () => {

  const [participants, setParticipants] = useState<null | IParticipantData[]>(null);

  // Get participants data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setParticipants(data);
      const uniqueYears = [...new Set(data.map((item: IParticipantData) => (item.competitive_year).toString()))];
      setYears(['All years', ...uniqueYears])
    },
  });

  // Get disciplines data
  const disciplines = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });

  // Search and filters form
  const [years, setYears] = useState<string[]>([""]); 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      competitive_year: "All years",
      discipline: "All disciplines",
      searchByName: "",
    }
  });

  const [disciplinesOpen, setDisciplinesOpen] = useState(false);
 
  function onSubmit(value: z.infer<typeof FormSchema>) {
    data && setParticipants(() => {
      const filteredByYear = value.competitive_year === 'All years'
        ? data
        : data?.filter(p => p.competitive_year.toString() === value.competitive_year);

      const filteredByDiscipline = value.discipline === 'All disciplines'
      ? filteredByYear
      : filteredByYear?.filter(p => p.discipline[0] === value.discipline);

      const searchedParticipant = value.searchByName 
        ? filteredByDiscipline.filter(p => p.name_and_surname.toLowerCase().includes(value.searchByName.toLowerCase()))
        : filteredByDiscipline

      return searchedParticipant;
    });
  }

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);

  const participantsPerPage = 16;
  const pagesVisited = pageNumber * participantsPerPage;

  const pageCount = Math.ceil((data && data) ? data.length / participantsPerPage : 0);

  const changePage = ({selected}: {selected: number}) => {
    setPageNumber(selected)
  }

  // Display participants
  const displayParticipants = participants?.slice(pagesVisited, pagesVisited + participantsPerPage)
    .map((p: IParticipantData) => (
      <ParticipantPreview key={p._id} participant={p}/>
  ));

  return (
    <main className="flex flex-col md:items-center sm:my-8 gap-8">
      <section className="w-full flex flex-col justify-center items-center gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col 2xl:flex-row justify-center items-end gap-4 w-full sm:w-10/12 md:w-auto">
            <section className="justify-center items-end w-full xl:w-auto flex flex-col xl:flex-row gap-4">
              <section className="justify-center items-end w-full xl:w-auto flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="discipline"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[300px] flex flex-col items-start">
                      <FormLabel className="w-auto">
                          Discipline
                      </FormLabel>
                        <Popover
                          open={disciplinesOpen}
                          onOpenChange={setDisciplinesOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between h-auto",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <ScrollArea className="h-[500px]">
                              <Command>
                                <CommandInput placeholder="Search discipline..." />
                                <CommandEmpty>
                                    No discipline found.
                                </CommandEmpty>
                                <CommandGroup>
                                  <CommandItem
                                    value="All disciplines"
                                    onSelect={() => {
                                      form.setValue("discipline", "All disciplines");
                                      setDisciplinesOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        "All disciplines" === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    All disciplines
                                  </CommandItem>
                                  {disciplines.data && disciplines.data.map((d) => (
                                    <CommandItem
                                      value={d.title}
                                      key={d.title}
                                      onSelect={() => {
                                        form.setValue("discipline", d.title);
                                        setDisciplinesOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          d.title === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {d.title}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="competitive_year"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[300px] flex flex-col items-start">
                      <FormLabel>
                        Year
                      </FormLabel>
                      <Select onValueChange={(e) => {
                        field.onChange(e)
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='All years' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {participants && years.map(y => (
                            <SelectItem key={y} value={y}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <FormField
                control={form.control}
                name="searchByName"
                render={({ field }) => (
                  <FormItem className="w-full xl:w-[300px] flex flex-col items-start" >
                    <FormLabel>Search by name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter participant's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <Button className="flex gap-2 w-full 2xl:w-[300px]" type="submit">
              Search
              <Search />
            </Button>
          </form>
        </Form>
        {
          displayParticipants
            && !displayParticipants.length
            && (
            <div>
              <h2 className="font-medium text-center">
                No results found.
              </h2>
              <p className="text-muted-foreground text-center">
                Try different keywords or remove search filters.
              </p>
            </div>
            )
        }
        <div className="justify-items-center w-full md:w-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
          {
            isLoading && [...Array(16)].map((el, i) => (
                <div key={i} className="flex flex-col gap-2 w-full sm:w-10/12 md:w-[300px]">
                  <AspectRatio 
                    className="overflow-hidden rounded-lg"
                    ratio={16 / 9}
                  >
                    <Skeleton
                      className="h-full w-full"
                    />
                  </AspectRatio>
                  <Skeleton className="h-4 w-[200px]" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[50px]" />
                  </div>
                </div>
            ))
          }
          {
            isError && 
              <h2 className="text-center">
                Something went wrong...
              </h2>
          }
          {displayParticipants && displayParticipants}
        </div>
        <ReactPaginate
          breakLabel={"..."}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"flex items-center justify-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 text-base"}
          disabledClassName={"text-muted-foreground"}
          disabledLinkClassName={"cursor-not-allowed"}
          activeClassName={"text-primary"}
        />
      </section>
    </main>
  )
}

export default Participants;