"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
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
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getDisciplines } from "@/sanity/sanity-utils"
import { useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
    disciplines: z.string({
        required_error: "Please select a discipline.",
      }),
    categories: z.string({
        required_error: "Please select a category.",
      }),
    name_and_surname: z.string().min(2, {
        message: "Name and surname must be at least 2 characters.",
    }),
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
    teacher: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }).optional(),
    conductor: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }).optional(),
    collective_leader: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }).optional(),
});

type FormValues = z.infer<typeof formSchema>

export const ApplyForm = () => {

  const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormValues) => {
      toast({
          title: "You submitted the following values:",
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">
                    {JSON.stringify(values, null, 2)}
                  </code>
              </pre>
          ),
      })
  }

  // Toggle popover on select
  const [disciplinesOpen, setDisciplinesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Sanity data queries
  const disciplines = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* DISCIPLINES */}
        <FormField
          control={form.control}
          name="disciplines"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                  Discipline*
              </FormLabel>
              <Popover open={disciplinesOpen} onOpenChange={setDisciplinesOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {disciplines.data && (field.value
                        ? disciplines.data.find(
                            (discipline) => discipline.title === field.value
                          )?.title
                        : "Select discipline")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <ScrollArea className="h-[500px]">
                      <Command>
                        <CommandInput placeholder="Search discipline..." />
                        <CommandEmpty>
                            No discipline found.
                        </CommandEmpty>
                        <CommandGroup>
                          {disciplines.data && disciplines.data.map((d) => (
                            <CommandItem
                              value={d.title}
                              key={d.title}
                              onSelect={() => {
                                form.setValue("disciplines", d.title);
                                form.clearErrors("disciplines");
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

        {/* CATEGORIES */}
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>
                    Category*
                </FormLabel>
              <Popover open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {categories.data && (field.value
                        ? categories.data.find(
                            (category) => category.title === field.value
                          )?.title
                        : "Select category")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <ScrollArea className="h-[500px]">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>
                          No category found.
                      </CommandEmpty>
                      <CommandGroup>
                        {categories.data && categories.data.map((c) => (
                          <CommandItem
                            value={c.title}
                            key={c.title}
                            onSelect={() => {
                              form.setValue("categories", c.title)
                              form.clearErrors("categories");
                              setCategoriesOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                c.title === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {c.title}
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

        {/* NAME AND SURNAME */}
        <FormField
          control={form.control}
          name="name_and_surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name and Surname/ Ensemble Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name and surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DATE OF BIRTH */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Date of birth*
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className=" w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={1900}
                    toYear={2030}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TEACHER */}
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Teacher
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter teacher's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CONDUCTOR */}
        <FormField
          control={form.control}
          name="conductor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Conductor
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter conductor's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* COLLECTIVE LEADER */}
        <FormField
          control={form.control}
          name="collective_leader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Collective leader
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter collective leader's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
            Submit
        </Button>
      </form>
    </Form>
  )
}
