"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"
import * as z from "zod";
import { cn } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  albumName: z.string().max(12, {
    message: "Album name field cannot be more than 12 characters.",
  }),
  artistName: z.string().max(12, {
    message: "Artist name field cannot be more than 12 characters.",
  }),
  genreName: z.string().max(12, {
    message: "Genre name field cannot be more than 12 characters.",
  }),
  releaseDate: z.date({
    required_error: "A release date is required.",
  }),
});

type formSchemaValues = z.infer<typeof formSchema>;

// const defaultValues: Partial<formSchemaValues> = {
//   username: "hello",
// };
export const ProfileForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues,
  });

  // 2. Define a submit handler.

  function onSubmit(data: formSchemaValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="albumName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album</FormLabel>
              <FormControl>
                <Input placeholder="Album..." {...field} />
              </FormControl>
              <FormDescription>This is the album name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input placeholder="Artist..." {...field} />
              </FormControl>
              <FormDescription>This is the Artist name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genreName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Genre..." {...field} />
              </FormControl>
              <FormDescription>The genre type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(day:Date | undefined) => field.onChange(day!)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
