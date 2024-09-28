"use client";
import React, { useState } from "react";
import { Check, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import getStripe from "@/lib/stripe";

export const NewPricing = ({ user }: { user?: CustomUser }) => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (plan: string) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/stripe/session", { plan: plan });
      if (data?.id) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId: data?.id });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-sky-500 -skew-y-3"></span>
                <span className="relative text-white px-2">1 coin = 1 ₹</span>
              </span>
            </p>
          </div>
          <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
            <PricingCard
              title="Starter"
              description="Perfect for individuals."
              price="100 Coins"
              features={[
                "10 Video Summaries",
                "Top Questions Highlight",
                "AI-Powered Insights",
              ]}
              onButtonClick={() => initiatePayment("Starter")}
              loading={loading}
            />
            <PricingCard
              title="Pro"
              description="Best for professionals."
              price="500 Coins"
              features={[
                "51 Video Summaries",
                "Top Questions Highlight",
                "AI-Powered Insights",
                "Priority Support",
                "Get One Video Summary Free 🚀",
              ]}
              onButtonClick={() => initiatePayment("Pro")}
              loading={loading}
              highlighted={true}
            />
            <PricingCard
              title="Pro Plus"
              description="Ideal for teams."
              price="1000 Coins"
              features={[
                "102 Video Summaries",
                "Top Questions Highlight",
                "AI-Powered Insights",
                "Dedicated Support",
                "Get Two Video Summaries Free 🚀",
              ]}
              onButtonClick={() => initiatePayment("Pro Plus")}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({
  title,
  description,
  price,
  features,
  onButtonClick,
  loading,
  highlighted = false,
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  onButtonClick: () => void;
  loading: boolean;
  highlighted?: boolean;
}) => (
  <Card className={`w-full rounded-md ${highlighted ? "shadow-2xl" : ""}`}>
    <CardHeader>
      <CardTitle>
        <span className="flex flex-row gap-4 items-center font-normal">
          {title}
        </span>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-8 justify-start">
        <p className="flex flex-row items-center gap-2 text-xl">
          <span className="text-4xl">{price}</span>
        </p>
        <div className="flex flex-col gap-4 justify-start">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-row gap-4">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col">
                <p>{feature}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant={highlighted ? "default" : "outline"}
          className="gap-4"
          onClick={onButtonClick}
          disabled={loading}
        >
          Buy Coins <MoveRight className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);