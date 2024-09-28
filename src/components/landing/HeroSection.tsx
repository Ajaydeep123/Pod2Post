import { MoveRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LoginModal from "@/components/auth/LoginModal";

export const HeroSection = ({ user }: { user?: CustomUser }) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 mb-16">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">AI-Powered Summaries</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              Unlock the Power of Content in Minutes
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              Don't have time to watch hours of videos or listen to long podcasts? Our AI-powered app summarizes YouTube videos and podcasts, giving you the key insights in a fraction of the time.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4 hidden md:inline-flex" variant="outline">
              Connect with us <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-muted rounded-md aspect-square relative overflow-hidden">
            <Image
              src="/images/pod2.jpg"
              alt="Lex Fridman podcast"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="bg-muted  rounded-md row-span-2 relative overflow-hidden">
            <Image
              src="/images/pod1.webp"
              alt="Podcast studio"
              fill 
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="bg-muted rounded-md aspect-square relative overflow-hidden">
            <Image
              src="/images/pod.jpg"
              alt="Microphone"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);