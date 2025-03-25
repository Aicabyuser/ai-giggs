import { ColorSystem } from "@/components/ui/color-system";

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
          Color System
        </h1>
        <p className="text-lg mb-8 text-text-secondary-light dark:text-text-secondary-dark">
          Our color system is designed to maintain brand consistency, provide clear visual hierarchy,
          ensure accessibility, and support both light and dark themes.
        </p>
        <ColorSystem />
      </div>
    </div>
  );
} 