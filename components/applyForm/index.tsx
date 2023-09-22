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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getDisciplines } from "@/sanity/sanity-utils"
import { useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import countryList from 'country-list'
import { PopoverClose } from "@radix-ui/react-popover"

// Zod form schema
const formSchema = z.object({
  disciplines: z
    .string({
      required_error: "Please select a discipline.",
    }),
  categories: z
    .string({
      required_error: "Please select a category.",
    }),
  name_and_surname: z
    .string({
      required_error: 'Please, enter your name and surname.'
    })
    .min(2, {
        message: "Name and surname must be at least 2 characters.",
    }),
  date_of_birth: z
    .date({
      required_error: "A date of birth is required.",
    }),
  teacher: z
    .string().optional(),
  conductor: z
    .string().optional(),
  collective_leader: z
    .string().optional(),
  accompanist: z
    .string().optional(),
  countries: z
    .string({
      required_error: "Please select a country.",
    }),
  place: z
    .string({
      required_error: "Please select a city/place.",
    })
    .min(2, {
      message: "City/place must be at least 2 characters.",
    }),
  // institution: z.
  //   string().optional(),
  // program: z
  //   .string()
  //   .min(5, {
  //     message: "Program must be at least 5 characters.",
  //   })
  //   .max(300, {
  //     message: "Program must not be longer than 300 characters.",
  //   }),
  // biography: z
  //   .string()
  //   .min(5, {
  //     message: "Biography must be at least 5 characters.",
  //   })
  //   .max(1500, {
  //     message: "Biography must not be longer than 1500 characters.",
  //   })
  //   .optional(),
  // participants_email: z
  //   .string()
  //   .min(1, { message: "This field has to be filled." })
  //   .email("Please, enter a valid email."),
  // teachers_email: z
  //   .string()
  //   .email("Please, enter a valid email.")
  //   .optional(),
  // video_link: z
  //   .string()
  //   .url({ message: "Please enter a valid URL." }),
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [disciplinesOpen, setDisciplinesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);

  // Sanity data queries
  const disciplines = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Country list
  const countries = countryList.getData();
  // Overwrite Türkiye to Turkey
  countryList.overwrite([{
    code: 'TR',
    name: 'Turkey',
  }]);

  //Remaining characters count for text areas
  const [programValue, setProgramValue] = useState('');
  const [programCharCount, setProgramCharCount] = useState(0);
  const calculateProgramCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProgramCharCount(e.target.value.length);
  };
  const handleProgramChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProgramCharCount(e.target.value.length);
    setProgramValue(e.target.value)
  }

  const [biographyValue, setBiographyValue] = useState('')
  const [biographyCharCount, setBiographyCharCount] = useState(0);
  const calculateBiographyCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiographyCharCount(e.target.value.length);
  };
  const handleBiographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiographyCharCount(e.target.value.length);
    setBiographyValue(e.target.value)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* DISCIPLINE */}
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
        {/* CATEGORY */}
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
              <FormLabel>
                Name and Surname/ Ensemble Name*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name and surname"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DATE OF BIRTH */}
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Date of birth*
              </FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                    onSelect={(e) => { 
                      field.onChange(e);
                      setCalendarOpen(false); 
                    }}
                    fromYear={1900}
                    toYear={2030}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                For collectives, the age is determined by calculating the average age of the participants.
              </FormDescription>
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
                <Input
                  placeholder="Enter teacher's name"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
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
                <Input
                  placeholder="Enter conductor's name"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
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
                <Input
                  placeholder="Enter collective leader's name"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ACCOMPANIST */}
        <FormField
          control={form.control}
          name="accompanist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Accompanist
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter accompanist's name"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* COUNTRY */}
        <FormField
          control={form.control}
          name="countries"
          render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>
                    Country*
                </FormLabel>
              <Popover open={countriesOpen} onOpenChange={setCountriesOpen}>
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
                      {countries && (field.value
                        ? countries.find(
                            (country) => country.name === field.value
                          )?.name
                        : "Select country")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <ScrollArea className="h-[500px]">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>
                          No country found.
                      </CommandEmpty>
                      <CommandGroup>
                        {countries && countries.map((c) => (
                          <CommandItem
                            value={c.name}
                            key={c.name}
                            onSelect={() => {
                              form.setValue("countries", c.name)
                              form.clearErrors("countries");
                              setCountriesOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                c.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {c.name}
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
        {/* CITY/ PLACE */}
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City/ place*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your city/ place"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value || undefined)
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* INSTITUTION */}
        {/* <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Institution
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your institution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* PROGRAM*/}
        {/* <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Program*
              </FormLabel>
              <p className={`text-sm ${programCharCount > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {programCharCount}/300 characters
              </p>
              <FormControl>
                <Textarea
                  placeholder="Composer and the name of the piece"
                  className="resize-none"
                  {...field}
                  onChange={handleProgramChange}
                  value={programValue || ''}
                />
              </FormControl>
              <FormDescription>
                When entering your program, please follow this format: 
                <br/>
                1. M. Bruch - Violin Concerto No. 1
                <br/>
                2. H. Wieniawski - Romance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* BIOGRAPHY */}
        {/* <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Brief artistic biography
              </FormLabel>
              <p className={`text-sm ${biographyCharCount > 1500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {biographyCharCount}/1500 characters
              </p>
              <FormControl>
                <Textarea
                  placeholder="Enter contestants artistic biography"
                  className="resize-none"
                  {...field}
                  onChange={handleBiographyChange}
                  value={biographyValue || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* PARTICIPANT'S EMAIL */}
        {/* <FormField
          control={form.control}
          name="participants_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your email*
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* TEACHER'S EMAIL */}
        {/* <FormField
          control={form.control}
          name="teachers_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Teacher's email
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder="Enter teacher's email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* VIDEO LINK */}
        {/* <FormField
          control={form.control}
          name="video_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Video Link*
              </FormLabel>
              <FormControl>
                <Input type='url' placeholder="Enter a link to download your video" {...field} />
              </FormControl>
              <FormDescription>
                If you submit YouTube links,
                be sure your video(s) have the proper settings:
                YouTube Video Manager → Videos → Basic Info → from the drop-down menu, 
                please choose "Public" or "Unlisted". 
                Do not choose "Private".
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">
            Submit
        </Button>
      </form>
    </Form>
  )
}
