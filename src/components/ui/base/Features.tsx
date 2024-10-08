import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function Features() {
  return (
    <div className="-mt-12">
      <h2 className="text-center text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-200">
        <span>Explore Our</span>
        <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-300 dark:via-yellow-400 dark:to-yellow-500">
          Features
        </span>
      </h2>
      <BentoGrid className="max-w-4xl mx-auto px-6 md:px-0">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            isOverlay={i === 3 || i === 6} // Keep overlay for 4th and 7th items but remove hover effect
            hideText={i === 3 || i === 6} // Hide text for 4th and 7th items
          />
        ))}
      </BentoGrid>
    </div>
  );
}




const items = [
  {
    title: "A Calm, Focused Writing Environment",
    description: "Step into a distraction-free zone, where your words flow as smoothly as a gentle stream through a forest. Blog Buddies is built to help you focus, with a minimalist design.",
    header: (
      <img loading="lazy" src="/1.png" alt="Calm Writing Environment" width={500} height={300} className="w-full h-auto rounded-xl object-contain" />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Markdown-Powered, Developer-Friendly",
    description: "Built by developers, for developers. Write with the power of Markdown, giving you full control over your content without unnecessary clutter.",
    header: (
      <img src="/2.png" alt="Markdown Power" width={500} height={300} className="w-full h-auto rounded-xl object-contain" />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Beautiful Dark Mode",
    description: "Whether you prefer the warm glow of daylight or the calming stillness of twilight, Blog Buddies offers a seamless dark mode experience designed for long writing sessions.",
    header: (
      <img loading="lazy" src="/3.png" alt="Beautiful Dark Mode" width={500} height={300} className="w-full h-auto rounded-xl object-contain" />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Ad-Free and Privacy-Focused",
    description: "No ads. No distractions. No data tracking. Just you, your thoughts, and a platform designed to help you share your work with the world in peace.",
    header: (
      <img
        loading="lazy"
        src="/4.png"
        alt="Ad-Free and Privacy-Focused"
        width={500}
        height={300}
        className="w-full h-auto rounded-xl object-contain"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment, where every exploration deepens your knowledge. Embrace the transformative journey that leads you to profound insights and meaningful connections with the world around you.",
    header: (
      <img loading="lazy" src="/5.png" alt="Pursuit of Knowledge" width={500} height={300} className="w-full h-auto rounded-xl object-contain" />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life. Witness the satisfaction of crafting something unique, inspiring others, and making a lasting impact through your innovative expressions.",
    header: (
      <img loading="lazy" src="/6.png" alt="Joy of Creation" width={500} height={300} className="w-full h-auto rounded-xl object-contain" />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <img 
        loading="lazy"
        src="/7.png"
        alt="Spirit of Adventure"
        width={500}
        height={300}
        className="w-full h-auto rounded-xl object-contain" 
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
