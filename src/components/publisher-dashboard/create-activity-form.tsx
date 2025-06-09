"use client";

import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/useToast";
import PublisherDashboardAPI from "@/api/PublisherDashboardAPI";

import {
  X,
  Plus,
  Upload,
  User,
  Calendar,
  Star,
  Award,
  MessageSquare,
  MapPin,
  Users,
} from "lucide-react";

const schema = z
  .object({
    title: z
      .string()
      .min(8, { message: "Title must contain at least 8 characters." })
      .max(100, { message: "Title must not exceed 100 characters." }),
    description: z
      .string()
      .min(1, { message: "Description must not be empty." }),
    category: z.string().min(1, { message: "Category is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date format.",
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid date.",
    }),
    points: z
      .number()
      .min(0, { message: "Points must not be negative." })
      .max(500, { message: "Points must not exceed 500 points." }),
    image: z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          ),
        {
          message: "Only .jpg, .jpeg, .png, and .webp images are allowed",
        }
      )
      .refine((file) => file.size <= 50 * 1024 * 1024, {
        message: "Max file size is 50MB",
      }),
    popup_exist: z.boolean().optional(),
    registerPopupTitle: z.string().optional(),
    registerPopupMessage: z.string().optional(),
    badge_exist: z.boolean().optional(),
    badgeName: z.string().optional(),
    badgeDescription: z.string().optional(),
    badgeIcon: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          !file ||
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          ),
        {
          message: "Only .jpg, .jpeg, .png, and .webp images are allowed",
        }
      )
      .refine((file) => !file || file.size <= 50 * 1024 * 1024, {
        message: "Max file size is 50MB",
      }),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be greater than or equal to the start date.",
    path: ["endDate"],
  });

export function CreateActivityForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      startDate: "",
      endDate: "",
      points: 0,
      image: undefined,
      popup_exist: false,
      registerPopupTitle: "",
      registerPopupMessage: "",
      badge_exist: false,
      badgeName: "",
      badgeDescription: "",
      badgeIcon: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value != null) {
          formData.append(key, String(value));
        }
      });

      //   const resp = await PublisherDashboardAPI.createActivityFull(formData);
      //   toast({ title: "Success", description: "Activity created successfully!" });
      console.log("Form Data:", data); // For debugging
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data.message || err.message
          : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title Section */}
            <div className="space-y-3">
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <FormLabel className="text-xl sm:text-2xl font-bold text-gray-900">
                      Title
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter event's title"
                      className="text-base sm:text-lg border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    <FormMessage />
                  </div>
                )}
              />
            </div>

            {/* Upload Photos Section */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Upload Photo of the event
              </h2>
              <Controller
                name="image"
                control={form.control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        onChange(e.target.files ? e.target.files[0] : null)
                      }
                      className="hidden"
                      {...rest}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                      className="w-full border-dashed border-2 border-gray-300 hover:border-sky-500 h-12"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Image
                    </Button>
                    <FormMessage />
                  </div>
                )}
              />
            </div>

            {/* About This Event */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                About This Event
              </h2>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write your event description here"
                    rows={6}
                    className="border-gray-200 focus:border-sky-500 focus:ring-sky-500 bg-sky-50"
                  />
                )}
              />
              <FormMessage />
            </div>

            {/* Simplified Join Popup Configuration */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Join Event Message
                </h2>
                <Controller
                  name="popup_exist"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enable-join-popup"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label
                        htmlFor="enable-join-popup"
                        className="text-sm font-medium"
                      >
                        Show message when users join
                      </Label>
                    </div>
                  )}
                />
              </div>

              {form.watch("popup_exist") && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Join Event Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Message Title
                      </Label>
                      <Controller
                        name="registerPopupTitle"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="e.g., Welcome to our event!"
                            className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Message Description
                      </Label>
                      <Controller
                        name="registerPopupMessage"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            placeholder="Thank you for joining! Please fill out our form at https://forms.google.com/... for additional details."
                            rows={4}
                            className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                          />
                        )}
                      />
                      <p className="text-xs text-gray-600">
                        Tip: Include any links (like Google Forms) in your
                        message - they will be clickable for users.
                      </p>
                    </div>

                    {(false || false) && (
                      <div className="pt-4 border-t border-orange-200">
                        <Label className="text-sm font-medium mb-2 block">
                          Preview
                        </Label>
                        <div className="p-4 bg-white rounded-lg border border-orange-200">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {form.watch("registerPopupTitle") || "Join Event"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {form.watch("registerPopupMessage") ||
                              "Thank you for your interest in joining this event!"}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Badge Creation Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Create Event Badge
                </h2>
                <Controller
                  name="badge_exist"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="create-badge"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label
                        htmlFor="create-badge"
                        className="text-sm font-medium"
                      >
                        Create custom badge
                      </Label>
                    </div>
                  )}
                />
              </div>

              {form.watch("badge_exist") && (
                <Card className="border-sky-200 bg-sky-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-sky-900 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Badge Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Badge Name</Label>
                      <Controller
                        name="badgeName"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="e.g., Green Warrior"
                            className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Badge Description
                      </Label>
                      <Controller
                        name="badgeDescription"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            placeholder="Describe what this badge represents"
                            rows={2}
                            className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Badge Icon</Label>
                      <Controller
                        name="badgeIcon"
                        control={form.control}
                        render={({ field: { onChange, value, ...rest } }) => (
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Input
                              id="badge-icon"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                onChange(
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("badge-icon")?.click()
                              }
                              className="border-dashed border-2 border-gray-300 hover:border-sky-500"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Icon
                            </Button>
                            {value && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  {value.name}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onChange(null)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    {false && (
                      <div className="pt-4 border-t border-sky-200">
                        <Label className="text-sm font-medium mb-2 block">
                          Preview
                        </Label>
                        <div className="inline-flex items-center gap-2 p-3 bg-white rounded-lg border border-sky-200">
                          <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                            {form.watch("badgeIcon") ? (
                              <img
                                src={URL.createObjectURL(
                                  form.watch("badgeIcon")!
                                )}
                                alt="Badge icon"
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <Award className="h-4 w-4 text-sky-600" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {form.watch("badgeName")}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thumbnail
                </h3>
                <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {form.watch("image") ? (
                    <img
                      src={URL.createObjectURL(form.watch("image")!)}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Plus className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Upload an image to see thumbnail
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <Label className="text-sm font-medium">Category</Label>
                  </div>
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-sky-500 focus:ring-sky-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="environmental">
                            Environmental
                          </SelectItem>
                          <SelectItem value="community">
                            Community Service
                          </SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="health">
                            Health & Wellness
                          </SelectItem>
                          <SelectItem value="arts">Arts & Culture</SelectItem>
                          <SelectItem value="sports">
                            Sports & Recreation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormMessage />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <Label className="text-sm font-medium">
                      Start Date & Time
                    </Label>
                  </div>
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="datetime-local"
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    )}
                  />
                  <FormMessage />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <Label className="text-sm font-medium">
                      End Date & Time
                    </Label>
                  </div>
                  <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="datetime-local"
                        min={form.watch("startDate")}
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    )}
                  />
                  <FormMessage />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <Label className="text-sm font-medium">Location</Label>
                  </div>
                  <Controller
                    name="location"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter location"
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    )}
                  />
                  <FormMessage />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <Label className="text-sm font-medium">Points Reward</Label>
                  </div>
                  <Controller
                    name="points"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Points participants will earn"
                        min="0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    )}
                  />
                  <FormMessage />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      John Publisher
                    </p>
                    <p className="text-sm text-gray-600">Event Organizer</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-100 text-red-800 cursor-default">
                    Add Category
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 cursor-default">
                    Approved ✓
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 cursor-default">
                    Technology ⚡
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 cursor-default">
                    Education 📚
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
