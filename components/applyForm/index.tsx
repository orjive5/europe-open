"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from "lucide-react"
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
import { getDisciplines } from "@/sanity/sanity-utils"

const formSchema = z.object({
    disciplines: z.string({
        required_error: "Please select a disciplines.",
      }),
    name_and_surname: z.string().min(2, {
        message: "Name and surname must be at least 2 characters.",
    }),
})

export const ApplyForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            disciplines: "Piano",
            name_and_surname: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

  const disciplines = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
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
                    Discipline
                </FormLabel>
              <Popover>
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
                            form.setValue("disciplines", d.title)
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
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the discipline that will be used in your application.
              </FormDescription> */}
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
              <FormLabel>Name and Surname/ Ensemble Name</FormLabel>
              <FormControl>
                <Input placeholder="Name and surname" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
