'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getDisciplines, getJury } from "@/sanity/sanity-utils";
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
import { IJury } from "@/types/jury.interface";
import JuryPreview from "@/components/juryPreview";

const FormSchema = z.object({
  discipline: z.string(),
});

const JuryClient = () => {

  const [jury, setJury] = useState<null | IJury[]>(null);

  // Get jury data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jury'],
    queryFn: getJury,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setJury(data);
    },
  });

  // Get disciplines data
  const disciplines = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });

  // Search and filters form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discipline: "All disciplines",
    }
  });

  const [disciplinesOpen, setDisciplinesOpen] = useState(false);

  function onSubmit(value: z.infer<typeof FormSchema>) {
    data && setJury(() => {
      return value.discipline === 'All disciplines'
        ? data
        : data?.filter(p => p.discipline.includes(value.discipline));
    });
    setPageNumber(0);
  }

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);

  const juryPerPage = 16;
  const pagesVisited = pageNumber * juryPerPage;

  const pageCount = Math.ceil((jury && jury) ? jury.length / juryPerPage : 0);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0 })
  }

  // Display jury
  const displayJury = jury?.slice(pagesVisited, pagesVisited + juryPerPage)
    .map((j: IJury) => (
      <JuryPreview key={j._id} member={j} />
    ));

  return (
    <main className="flex flex-col md:items-center sm:my-8 gap-8">
      <section className="w-full flex flex-col justify-center items-center gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row self-start justify-center items-end gap-4 w-full sm:w-10/12 md:w-auto">
            <FormField
              control={form.control}
              name="discipline"
              render={({ field }) => (
                <FormItem className="w-full md:w-[200px] flex flex-col items-start">
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
            <Button className="flex gap-2" type="submit">
              Search
              <Search />
            </Button>
          </form>
        </Form>
        {
          displayJury
          && !displayJury.length
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
                  ratio={1 / 1}
                >
                  <Skeleton
                    className="h-full w-full"
                  />
                </AspectRatio>
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                  <div className="gap-1 flex flex-col justify-between items-start">
                    <Skeleton className="h-4 w-[150px]" />
                    <div className="flex gap-2 flex-wrap">
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </section>
              </div>
            ))
          }
          {
            isError &&
            <h2 className="text-center">
              Something went wrong...
            </h2>
          }
          {displayJury && displayJury}
        </div>
        {pageCount > 1 && (
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
        )}
      </section>
    </main>
  )
}

export default JuryClient;