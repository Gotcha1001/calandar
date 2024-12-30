import FeatureMotionWrapperMap from "@/components/frameranimations/FeatureMotionWrapperMap";
import MotionWrapperDelay from "@/components/frameranimations/MotionWrapperDelay";
import TestamonialCarousel from "@/components/testamonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import howItWorks from "@/lib/howitWorks";
import features from "@/lib/jsonDataHome";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <main className="containter mx-auto px-4 py-16">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      <div className="lg:w-1/2">
        <h1 className="text-7xl font-extrabold pb-6 gradient-title">Simplify Your Scheduling</h1>
        <p className="text-xl text-gray-300 mb-10">Calandar helps you manage your time effectively. Create Events, set your availability, and let others book time with you seamlessly.</p>
        <Link href="/dashboard">
          <Button size="lg">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        {/* poster */}
        <div className="relative w-full max-w-md aspect-square">
          <Image src="/CalandarLandingImage.png" alt="Logo Image" layout="fill" objectFit="contain" />
        </div>

      </div>
    </div>
    {/* Key Features */}
    <div className="mb-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-title1">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureMotionWrapperMap key={index} index={index}>
            <Card>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-indigo-500 mb-4 mx-auto" />
                <CardTitle className="text-center text-indigo-600">{feature.title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </FeatureMotionWrapperMap>
        ))}
      </div>
    </div>
    <div className="mb-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-title1">What Users Are Saying</h2>
      <TestamonialCarousel />
    </div>
    {/* how it works */}
    <div className="mb-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-title1">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorks.map((step, index) => (
          <FeatureMotionWrapperMap key={index} index={index}>
            <div className="text-center gradient-background2 rounded-lg p-2">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto b-4">
                <span className="text-indigo-600 font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">{step.step}</h3>
              <h3 className="text-gray-500">{step.description}</h3>
            </div>
          </FeatureMotionWrapperMap>
        ))}
      </div>
    </div>


    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="bg-indigo-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 zoom">Ready To Simplify Your Scheduling</h2>
        <p className="text-xl mb-6 text-gray-400">Join thousands of professionals who trust Calandar for efficient time management</p>
        <Link href="/dashboard">
          <Button size="lg" variant="calendar" className="text-indigo-500">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div></MotionWrapperDelay>
  </main>
}
