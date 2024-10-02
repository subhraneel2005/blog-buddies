import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto", // Increased row height and gap
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  isOverlay, // Prop to control overlay behavior
  hideText, // Prop to hide text
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  isOverlay?: boolean; // Prop for overlay effect
  hideText?: boolean; // Prop to hide text for specific items
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="relative overflow-hidden"> {/* Added overflow-hidden for proper clipping */}
        {/* Header for image */}
        <div className={`${isOverlay ? '' : ''}`}>
          {header}
        </div>
        
        {/* Overlay for the image with text */}
        {isOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
            <div className="text-white text-center">
              <div className="font-sans font-bold text-lg">{title}</div>
              <div className="font-sans font-normal text-xs">{description}</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Conditionally render text for non-overlay items */}
      {!hideText && (
        <div className="flex flex-col items-center space-y-2">
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
          {icon}
        </div>
      )}
    </div>
  );
};




