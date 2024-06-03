"use client";
import { UpdateUserFormSchema } from "@/lib/actions/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { updateGuestAction } from "@/lib/actions/guest.action";
import { User } from "next-auth";
import { Country } from "@/types/shared";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";

interface UpdateProfileFormProps {
  guest: User;
  countries: Country[];
}

const UpdateProfileFormZod = ({ guest, countries }: UpdateProfileFormProps) => {
  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      firstName: guest.firstName || "",
      lastName: guest.lastName || "",
      nationalID: guest.nationalID || "",
      nationality: guest.nationality
        ? `${guest.nationality}%${guest.countryFlag}`
        : "",
    },
  });
  const { isSubmitting,isDirty } = form.formState;

  const handleSubmit = async (values: z.infer<typeof UpdateUserFormSchema>) => {
    await updateGuestAction(values);
    toast.success("Profile updated successfully");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 bg-primary-900 p-5"
        >
          <div className="flex w-full flex-col gap-5 lg:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm sm:text-xl">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      type="text"
                      className="rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm sm:text-xl">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Last name"
                      className="rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel className="text-sm sm:text-xl">Email</FormLabel>
            <FormControl>
              <Input
                placeholder={guest.email ?? ""}
                type="email"
                className="rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-sm sm:text-xl">
                      What is your nationality?
                    </FormLabel>
                    {guest.countryFlag && (
                      <Image
                        width={30}
                        height={30}
                        src={guest.countryFlag ?? ""}
                        alt="Country flag"
                        className="h-5 rounded-sm"
                      />
                    )}
                  </div>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className=" rounded-sm bg-primary-200  text-primary-800 shadow-sm">
                        {countries.map((c: { name: string; flag: string }) => (
                          <SelectItem
                            key={c.name}
                            value={`${c.name}%${c.flag}`}
                            className="cursor-pointer hover:bg-primary-50"
                          >
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="nationalID"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-xl">
                  National ID Number
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="National ID number"
                    className="rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="min-w-[200px] self-end">
            <SubmitButton
              label="Update profile"
              pendingLabel="Updating..."
              pendingState={isSubmitting }
              dirtyState={isDirty}  
              
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateProfileFormZod;
