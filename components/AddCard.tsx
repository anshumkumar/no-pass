"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addCardServer } from "@/app/actions"


// Define the schema using Zod
export const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number cannot exceed 19 digits" })
    .regex(/^[0-9\s-]+$/, {
      message: "Card number can only contain numbers, spaces, or dashes",
    }),
  cardName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Expiry date must be in MM/YY format",
    }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be at least 3 digits" })
    .max(4, { message: "CVV cannot exceed 4 digits" })
    .regex(/^[0-9]+$/, { message: "CVV can only contain numbers" }),
})

export type CardFormValues = z.infer<typeof formSchema>

export function AddCard() {

  const user = useUser()
  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<CardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  // Submit handler for the form
  function onSubmit(values: CardFormValues) {
    console.log(values)
    if (user.user){
    addCardServer(Number(values.cardNumber), values.expiryDate, Number(values.cvv), values.cardName, user.user.id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your card number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      {/* If you prefer to have the submit button in the footer, you can move it there. */}
      <CardFooter>
        <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
          Add Card
        </Button>
      </CardFooter>
    </Card>
  )
}
