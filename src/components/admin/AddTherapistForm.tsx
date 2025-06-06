
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { CreateTherapistInvitationRequest } from "@/lib/types/invitation";
import { countries } from "@/lib/data/countries";
import { nationalities } from "@/lib/data/nationalities";

const therapistInvitationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform(val => val.toLowerCase()),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  country_of_residence: z.string().min(1, "Country of residence is required"),
});

interface AddTherapistFormProps {
  onSubmit: (data: CreateTherapistInvitationRequest) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

const AddTherapistForm: React.FC<AddTherapistFormProps> = ({
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const form = useForm<CreateTherapistInvitationRequest>({
    resolver: zodResolver(therapistInvitationSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      gender: undefined,
      date_of_birth: "",
      nationality: "",
      country_of_residence: "",
    },
  });

  const handleSubmit = async (data: CreateTherapistInvitationRequest) => {
    await onSubmit(data);
  };

  // Transform nationalities for combobox
  const nationalityOptions = nationalities.map(nationality => ({
    value: nationality.adjective,
    label: nationality.adjective,
    icon: nationality.flag
  }));

  // Transform countries for combobox
  const countryOptions = countries.map(country => ({
    value: country.name,
    label: country.name,
    icon: country.flag
  }));

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Invite New Therapist</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Combobox
                        options={nationalityOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select nationality"
                        searchPlaceholder="Search nationalities..."
                        emptyText="No nationality found."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country_of_residence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <FormControl>
                      <Combobox
                        options={countryOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select country"
                        searchPlaceholder="Search countries..."
                        emptyText="No country found."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-brand-blue hover:bg-brand-dark-blue"
              >
                {isLoading ? "Sending Invitation..." : "Send Invitation"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTherapistForm;
