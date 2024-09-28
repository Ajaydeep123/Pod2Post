import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "What is Pod2Post?",
    answer: "Pod2Post is a platform that converts podcasts into engaging blog posts. We offer AI-powered insights and video summaries to help you create compelling content from your audio material."
  },
  {
    question: "How does the coin system work?",
    answer: "Our platform uses a coin-based system where 1 coin equals 1 ₹. You can purchase coins in different packages: Starter (100 coins), Pro (500 coins), and Pro Plus (1000 coins). These coins can be used to generate video summaries and access other features."
  },
  {
    question: "What features are included in each plan?",
    answer: "All plans include video summaries, top questions highlight, and AI-powered insights. The Pro plan adds priority support and one free video summary. The Pro Plus plan offers dedicated support and two free video summaries. The number of video summaries varies by plan: Starter (10), Pro (51), and Pro Plus (102)."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade your plan at any time. Simply choose the new plan you want, and you'll be able to purchase the corresponding coin package. Your account will be updated with the new features and video summary allowance."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We use Stripe for secure payments. Stripe accepts various payment methods including credit/debit cards and some local payment options. The exact methods available may depend on your location."
  },
  {
    question: "Is there a refund policy?",
    answer: "Please contact our support team at ajaydeep.dev@gmail.com for questions about refunds. We handle refund requests on a case-by-case basis, considering factors such as usage and time since purchase."
  }
];

export const FAQ = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant="outline">FAQ</Badge>
          <div className="flex gap-2 flex-col">
            <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Frequently Asked Questions
            </h4>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Find answers to common questions about Pod2Post, our pricing, and how our service works.
            </p>
          </div>
          <div>
            <Button className="gap-4" variant="outline" asChild>
              <a href="mailto:ajaydeep.dev@gmail.com">
                Any questions? Reach out <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="max-w-3xl w-full mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`index-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);