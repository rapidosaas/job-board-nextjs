"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { ProfileValues, profileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import SkillsInput from "@/components/SkillsInput";
import Image from "next/image";
import { useEffect, useState } from "react";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

import Profile from "@/lib/types/profile";

const randomImages = [
    { name: avatar1, source: "avatar-1.png" },
    { name: avatar2, source: "avatar-2.png" },
    { name: avatar3, source: "avatar-3.png" },
];

export default function ProfileForm() {
    const { data: session } = useSession();

    if (!session) {
        redirect("/");
    }

    const [defaultValues, setDefaultValues] = useState<Profile | undefined>({} as Profile);

    const form = useForm<ProfileValues>({
        defaultValues,
        resolver: zodResolver(profileSchema),
    });

    const {
        handleSubmit,
        control,
        setFocus,
        reset,
    formState: { isSubmitting },
    } = form;

    useEffect(() => {
        if (session) {
            // Fetch the user's profile data
            fetch("/api/dashboard/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data:', data);
                const profileData = {
                  ...data.profile
                };
                setDefaultValues(profileData);
                reset(profileData);
            });
        } else {
            redirect("/");
        }
    }, [session, reset]);

    console.log('Default Values:', defaultValues);

    async function onSubmit(values: ProfileValues) {
        try {
            await fetch("/api/dashboard/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    userId: session?.user.id,
                }),
            });
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    }

    const availableAvatars = randomImages;

  return (
    <main className="m-auto my-10 max-w-4xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
        <p className="text-muted-foreground">
          Get your profile seen by thousands of companies.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <SkillsInput 
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                      knownskills={defaultValues?.skills}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily rate</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    type="number"
                    value={field.value ?? 0}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) >= 0) {
                        field.onChange(value === "" ? "" : Number(value));
                      }
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("bio")}>
                    Bio
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(e: string) => {
                                    field.onChange(e);
                                }}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row flex-wrap gap-2 max-xl:justify-center"
                            >
                                {availableAvatars.map((image) => (
                                    <FormItem key={image.name.src}>
                                        <FormLabel className="[&:has([data-state=checked])>img]:border-primary [&:has([data-state=checked])>img]:border-1 [&:has([data-state=checked])>img]:p-px cursor-pointer">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={image.source}
                                                    className="sr-only"
                                                />
                                            </FormControl>

                                            <Image
                                                key={image.name.src}
                                                src={image.name}
                                                alt="avatar"
                                                className="h-12 w-12 rounded-full border hover:p-px hover:border-primary transition-transform"
                                            />
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Save
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
