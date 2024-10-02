import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
      name: "Emma",
      username: "@emma",
      body: "This app has completely transformed my blogging experience. The interface is so intuitive and easy to use. I'm hooked!",
      img: "https://avatar.vercel.sh/emma",
    },
    {
      name: "Liam",
      username: "@liam",
      body: "From drafting to publishing, every step feels effortless. My audience engagement has increased significantly since I started using this app.",
      img: "https://avatar.vercel.sh/liam",
    },
    {
      name: "Sophia",
      username: "@sophia",
      body: "I never knew blogging could be this enjoyable! The minimalist design really helps me focus on my writing.",
      img: "https://avatar.vercel.sh/sophia",
    },
    {
      name: "Mason",
      username: "@mason",
      body: "The dark mode is perfect for late-night writing sessions. This app has everything a modern blogger needs.",
      img: "https://avatar.vercel.sh/mason",
    },
    {
      name: "Olivia",
      username: "@olivia",
      body: "This app is hands down the best blogging platform I've tried. No ads, no distractions, just pure creativity!",
      img: "https://avatar.vercel.sh/olivia",
    },
    {
      name: "Noah",
      username: "@noah",
      body: "I love how customizable everything is! From fonts to themes, it feels like my personal writing space.",
      img: "https://avatar.vercel.sh/noah",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg mb-48 pb-16">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-200">
        <span>Our</span>
        <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 dark:from-green-300 dark:via-green-400 dark:to-green-500">
          Reviews
        </span>
      </h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
