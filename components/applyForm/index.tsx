"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Controller,
  useForm
} from "react-hook-form"
import { formSchema, FormValues } from "@/lib/zodFormSchema"
import { 
  Check,
  ChevronsUpDown,
  CalendarIcon,
  UploadCloud,
  X,
  ShieldCheck
} from "lucide-react"
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
import {
  getCategories,
  getDisciplines
} from "@/sanity/sanity-utils"
import {
  useCallback,
  useEffect,
  useState
} from "react"
import { ScrollArea } from "../ui/scroll-area"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import Dropzone from 'react-dropzone';
import Image from "next/image"
import { ToastAction } from "../ui/toast"
import { Checkbox } from "../ui/checkbox"
import Link from "next/link"
import { countries } from "@/constants/countriesList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { onSubmit } from "@/lib/onApplicationSubmit"
import CheckoutSheet from "../checkoutSheet"
import { useBoundStore } from "@/store"

export const ApplyForm = () => {

  const store = useBoundStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

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

  disciplines && console.log(disciplines.data)

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  //Remaining characters count for text areas
  const [programCharCount, setProgramCharCount] = useState(0);
  const handleProgramChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProgramCharCount(e.target.value.length);
  }

  const [biographyCharCount, setBiographyCharCount] = useState(0);
  const handleBiographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiographyCharCount(e.target.value.length);
  }
  
  // Error toast for drag & drop
  const errorToast = ({description}: {description: string}) => toast({
    variant: 'destructive',
    title: "Error",
    description,
    action: 
      <ToastAction altText="Try again">
        Try again
      </ToastAction>,
  })

  // Drag & Drop for documents
  const onDocumentDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length + form.getValues().identity_documents?.length > 10) {
      errorToast({
        description:"You can only upload up to 10 files.",
      })
      return;
    } else if (acceptedFiles?.length && acceptedFiles?.[0].size > 5000000) {
      errorToast({
        description:"Max file size is 5MB.",
      })
      return;
    } else if (rejectedFiles && rejectedFiles?.length) {
      errorToast({
        description: rejectedFiles[0]?.errors[0]?.message,
      })
      return;
    } else {
      acceptedFiles.forEach((file: any) => {
        form.setValue(
          'identity_documents',
          form.getValues().identity_documents ? [...form.getValues().identity_documents, file] : [file]
        )
        form.trigger('identity_documents')
      });
    }
  }, []);

  // Drag & Drop for avatar
  const onAvatarDrop = (acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles.length > 1) {
      errorToast({
        description:"You can only upload 1 file.",
      })
      return;
    } else if (acceptedFiles && acceptedFiles[0]?.size >= 5000000) {
      errorToast({
        description:"Max file size is 5 MB.",
      })
      return;
    } else if (rejectedFiles && rejectedFiles?.length) {
      errorToast({
        description: rejectedFiles[0]?.errors[0]?.message,
      })
      return;
    } else {
      form.setValue('avatar', acceptedFiles as unknown as FileList, {
        shouldValidate: true,
      });
      form.trigger('avatar')
    }
  }
  
  // Diploma by post and address - need to clear errors manually
  const handleAddress = () => {
    (form.watch('diploma_by_post') && form.watch('address') === undefined || form.watch('address') === '') && form.setError('address', { type: 'custom', message: 'Please, provide your address.' })
  }
  useEffect(() => {
    form.watch('diploma_by_post') === false && form.clearErrors('address')
  }, [form.watch('diploma_by_post')]);

  const onSubmitError = () => {
    console.log('submit error')
    handleAddress()
  }
  
  return (
      <div className="flex justify-center items-center">
        <CheckoutSheet open={store.open_checkout} onOpenChange={store.setOpenCheckout} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
            className="w-full lg:w-3/4 xl:w-2/3 border p-8 rounded space-y-8"
          >
            <div className="flex w-full gap-4">
              {/* DISCIPLINE */}
              <FormField
                control={form.control}
                name="disciplines"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel className="w-auto">
                        Discipline*
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
                              {disciplines.data && (field.value
                                ? disciplines.data.find(
                                    (discipline) => discipline.title === field.value
                                  )?.title
                                : "Select discipline")}
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
                  <FormItem className="flex-grow flex flex-col items-start">
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
                              "w-full justify-between h-auto",
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
                      <PopoverContent className="w-full p-0">
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
            </div>
            {/* NAME AND SURNAME */}
            <FormField
              control={form.control}
              name="name_and_surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name and Surname/Ensemble Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name and surname"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value || undefined)
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
                <FormItem className="flex flex-col items-start">
                  <FormLabel>
                    Date of Birth*
                  </FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger className="w-full" asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
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
                    <PopoverContent align="start" className="flex justify-center items-center w-full p-4">
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
                    For collectives, the age is determined by calculating
                    the average age of the participants.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-4">
              {/* TEACHER */}
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Teacher
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter teacher's name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
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
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Accompanist
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter accompanist's name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
                        }}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-4">
              {/* CONDUCTOR */}
              <FormField
                control={form.control}
                name="conductor"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Conductor
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter conductor's name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
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
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Collective leader
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter collective leader's name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
                        }}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-4">
              {/* COUNTRY */}
              <div className="flex-grow flex flex-col">
                <FormField
                  control={form.control}
                  name="countries"
                  render={({ field }) => (
                    <FormItem>
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
                                "w-full justify-between h-auto",
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
                        <PopoverContent className="p-0">
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
              </div>
              {/* CITY/PLACE */}
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem className="gap-1 flex-grow flex flex-col justify-end items-start">
                    <FormLabel>
                      City/Place*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your city/place"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
                        }}
                        value={field.value || ''}
                        className='h-[42px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* INSTITUTION */}
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Institution
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your institution"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value || undefined)
                      }}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PROGRAM*/}
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Program*
                  </FormLabel>
                  <p className={`text-base ${programCharCount > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {programCharCount}/300 characters
                  </p>
                  <FormControl>
                    <Textarea
                      placeholder="Composer and the name of the piece"
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        handleProgramChange(e)
                        field.onChange(e.target.value || undefined)
                      }}
                      value={field.value || ''}
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
            />
            {/* BIOGRAPHY */}
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Brief Artistic Biography
                  </FormLabel>
                  <p className={`text-base ${biographyCharCount > 1500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {biographyCharCount}/1500 characters
                  </p>
                  <FormControl>
                    <Textarea
                      placeholder="Enter contestants artistic biography"
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        handleBiographyChange(e)
                        field.onChange(e.target.value || undefined)
                      }}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-4">
              {/* PARTICIPANT'S EMAIL */}
              <FormField
                control={form.control}
                name="participants_email"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Your Email*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder="Enter your email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
                        }}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TEACHER'S EMAIL */}
              <FormField
                control={form.control}
                name="teachers_email"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col items-start">
                    <FormLabel>
                      Teacher's Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder="Enter teacher's email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined)
                        }}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* VIDEO LINK */}
            <FormField
              control={form.control}
              name="video_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Video Link*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='url'
                      placeholder="Provide a link for downloading your video"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value || undefined)
                      }}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    We strongly recommend a link to a YouTube video.
                    <br />
                    You can submit any link from where your video can be downloaded,
                    ensuring it is less than 500 MB in size.
                    <br />
                    If you submit a YouTube link, please ensure that the video is set to "Public".
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* IDENTITY DOCUMENTS */}
            <Controller
              control={form.control}
              name="identity_documents"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <div>
                  <FormLabel>
                    Documents confirming the identity*
                  </FormLabel>
                  <Dropzone
                    maxSize={5000000}
                    accept={{
                      'image/jpg': [],
                      'image/jpeg': [],
                      'image/png': [],
                      'image/webp': [],
                    }}
                    multiple
                    onDrop={onDocumentDrop}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                    }) => (
                      <div className="mt-2">
                        <div
                          className={`text-muted-foreground cursor-pointer flex flex-col gap-2 h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-dashed ${isDragActive ? 'bg-muted' : 'bg-transparent'}`}
                          {...getRootProps()}
                        >
                          <input
                            {...getInputProps({
                              id: 'spreadsheet',
                              onChange,
                              onBlur,
                            })}
                          />
                          <div className="flex gap-2">
                            <UploadCloud />
                            <p>
                                Choose a file
                                or drag and drop
                            </p>{' '}
                          </div>
                          <div className="flex gap-2">
                            <p>Accepted file types: JPEG, PNG, WEBP</p>
                            <p>Max file size: 5 MB</p>
                            <p>File limit: 10</p>
                          </div>
                        </div>
                        {/* Preview uploaded images */}
                        <div className="flex flex-col items-start gap-4 mt-2">
                          {value &&
                            value.map((image: any, index: number) => (
                              <div key={index} className="flex gap-2 justify-center items-center">
                                <div className="rounded relative w-12 h-12">
                                  <Image
                                      src={`${URL.createObjectURL(image)}`}
                                      alt="Participant's document"
                                      priority={true}
                                      fill
                                      sizes="(min-width: 640px) 64px, 48px"
                                      className="rounded object-cover box-border overflow-hidden"
                                  />
                                </div>
                                <p
                                  className="text-base text-muted-foreground"
                                >
                                  {image.name}
                                </p>
                                <X
                                  className="w-5 h-5 text-muted-foreground"
                                  onClick={() => {
                                    value.splice(index, 1)
                                    form.setValue('identity_documents', [...value])
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <FormDescription>
                    A document confirming the identity and date of birth
                    is required for soloists (School ID card, for example),
                    and for collectives, a scanned list of participants with
                    their dates of birth and the stamp of the institution.
                  </FormDescription>
                  <div className="text-red-600">
                    {fieldState.error && (
                      <span role="alert">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            />
            {/* AVATAR */}
            <Controller
              control={form.control}
              name="avatar"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <div>
                  <FormLabel>
                    Participant's photo
                  </FormLabel>
                  <Dropzone
                    maxSize={5000000}
                    accept={{
                      'image/jpg': [],
                      'image/jpeg': [],
                      'image/png': [],
                      'image/webp': [],
                    }}
                    onDrop={onAvatarDrop}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                    }) => (
                      <div className="mt-2">
                        <div
                          className={`text-muted-foreground cursor-pointer flex flex-col gap-2 h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-dashed ${isDragActive ? 'bg-muted' : 'bg-transparent'}`}
                          {...getRootProps()}
                        >
                        <input
                          {...getInputProps({
                            id: 'spreadsheet',
                            onChange,
                            onBlur,
                          })}
                        />
                          <div className="flex gap-2">
                            <UploadCloud />
                            <p>
                                Choose a file
                                or drag and drop
                            </p>{' '}
                          </div>
                          <div className="flex gap-2">
                            <p>Accepted file types: JPEG, PNG, WEBP</p>
                            <p>Max file size: 5 MB</p>
                            <p>File limit: 1</p>
                          </div>
                        </div>
                        {/* Preview uploaded images */}
                        <div className="flex flex-col items-start gap-4 mt-2">
                          {value &&
                            value.map((image: any, index: number) => (
                              <div key={index} className="flex gap-2 justify-center items-center">
                                <div className="rounded relative w-12 h-12">
                                  <Image
                                      src={`${URL.createObjectURL(image)}`}
                                      alt="Participant's photo"
                                      priority={true}
                                      fill
                                      sizes="(min-width: 640px) 64px, 48px"
                                      className="rounded object-cover box-border overflow-hidden"
                                  />
                                </div>
                                <p
                                  className="text-base text-muted-foreground"
                                >
                                  {image.name}
                                </p>
                                <X
                                  className="w-5 h-5 text-muted-foreground"
                                  onClick={() => {
                                    value.splice(index, 1)
                                    form.setValue('avatar', [...value])
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <FormDescription>
                    Photo will be used as an avatar on our website.
                  </FormDescription>
                  <div className="text-red-600">
                    {fieldState.error && (
                      <span role="alert">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            />
            {/* DISCLAIMER */}
            <Alert>
              <div className="flex gap-2">
                <ShieldCheck className="h-6 w-6"/>
                <div>
                  <AlertTitle>Please read</AlertTitle>
                  <AlertDescription>
                    The information you provided will be used in diplomas.
                    Please take your time to review it and check for any mistakes.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
            {/* INFO CORRECT */}
            <FormField
              control={form.control}
              name="info_correct"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I confirm that the information I provided is true and accurate.*
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* AGREE WITH THE TERMS */}
            <FormField
              control={form.control}
              name="agree_with_terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    I agree with all the terms of the contest.*
                    </FormLabel>
                    <FormDescription>
                      Read the competition rules{' '}
                      <Link
                        className="underline"
                        href='/rules'
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        here
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diploma_by_post"
              render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                          <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                          />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                          <FormLabel>
                              Diploma by post (+10 eur)
                          </FormLabel>
                          <FormDescription>
                              You will receive e-diploma by default.
                              If you want to receive your diploma sent via postal service,
                              there is an additional fee.
                          </FormDescription>
                      </div>
                  </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>
                      Address (required only if you want diploma by post)
                    </FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Enter your postal address"
                        className="resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormDescription>
                        Please, provide exact, full postal address
                        in your own language, or in English.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button className="w-full" type="submit">
                Proceed to Checkout
            </Button>
          </form>
        </Form>
      </div>
  )
}
