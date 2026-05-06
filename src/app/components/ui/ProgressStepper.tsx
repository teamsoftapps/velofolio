import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  date?: string;
  completed: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  const lastCompletedIndex = steps.reduce(
    (acc, step, index) => (step.completed ? index : acc),
    -1
  );

  const progressWidth =
    lastCompletedIndex >= 0
      ? `${(lastCompletedIndex / (steps.length - 1)) * 100}%`
      : "0%";

  return (
    <div className="relative w-full overflow-x-auto py-6 scroller">
      {/* Steps container */}
      <div className="relative flex items-center gap-8 sm:gap-12 min-w-max px-4 sm:px-0">
        {/* Background Line */}
        <div className="absolute top-6 sm:top-8 left-8  right-0 h-2 bg-gray-200 rounded-full"></div>

        {/* Progress Line */}
        <div
          className="absolute top-6 sm:top-8 left-20  h-2 bg-[var(--primary-color)] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: progressWidth }}
        />

        {/* Step Circles & Labels */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex  flex-col items-center z-10 min-w-[60px] sm:min-w-[80px]"
          >
            {/* Circle */}
            <div
              className={`relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-6 sm:border-8 transition-all duration-300 shadow-md ${
                step.completed
                  ? "border-[var(--primary-color)] bg-white text-[var(--primary-color)]"
                  : "border-gray-300 bg-white text-gray-300"
              }`}
            >
             
                <Check className="h-6 w-6 sm:h-8 sm:w-8" />
             
            </div>

            {/* Title & Date */}
            <div className="mt-2 text-center w-20 h-11 sm:w-28 flex flex-col justify-start">
              <h3
                className={`text-sm sm:text-lg font-medium ${
                  step.completed ? "text-black font-semibold" : "text-gray-700"
                } truncate`}
              >
                {step.title}
              </h3>
              {step.date && (
                <p className="text-xs sm:text-sm text-[#b4b4b4] mt-1 truncate">
                  {step.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
