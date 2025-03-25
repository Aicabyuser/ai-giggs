import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  color: string;
  description?: string;
  className?: string;
}

interface ColorVariationsProps {
  name: string;
  colors: {
    DEFAULT: string;
    hover?: string;
    active?: string;
    light?: string;
    dark?: string;
  };
  description?: string;
}

const ColorSwatch = ({ name, color, description, className }: ColorSwatchProps) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="flex items-center gap-2">
      <div
        className="h-8 w-8 rounded-md border"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium">{name}</span>
    </div>
    <code className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
      {color}
    </code>
    {description && (
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
        {description}
      </p>
    )}
  </div>
);

const ColorVariations = ({ name, colors, description }: ColorVariationsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch
          name="Default"
          color={colors.DEFAULT}
          description="Base color"
        />
        {colors.hover && (
          <ColorSwatch
            name="Hover"
            color={colors.hover}
            description="Hover state"
          />
        )}
        {colors.active && (
          <ColorSwatch
            name="Active"
            color={colors.active}
            description="Active state"
          />
        )}
        {colors.light && (
          <ColorSwatch
            name="Light"
            color={colors.light}
            description="Lighter shade"
          />
        )}
        {colors.dark && (
          <ColorSwatch
            name="Dark"
            color={colors.dark}
            description="Darker shade"
          />
        )}
      </div>
    </CardContent>
  </Card>
);

export function ColorSystem() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorVariations
            name="Primary Green"
            colors={{
              DEFAULT: "#62BC7C",
              hover: "#559F6D",
              active: "#4A8B5E",
              light: "#7BCA8F",
              dark: "#4A8B5E",
            }}
            description="Primary brand color with variations"
          />
          <ColorVariations
            name="Secondary Blue"
            colors={{
              DEFAULT: "#4A90E2",
              hover: "#357ABD",
              active: "#2A5F94",
              light: "#6BA5E7",
              dark: "#2A5F94",
            }}
            description="Secondary brand color with variations"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Theme Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Light Theme</CardTitle>
              <CardDescription>Default theme colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Background"
                color="#F5F5F5"
                description="Main background color"
              />
              <ColorSwatch
                name="Card Background"
                color="#FFFFFF"
                description="Card background color"
              />
              <ColorSwatch
                name="Text Primary"
                color="#2C2C2C"
                description="Main text color"
              />
              <ColorSwatch
                name="Text Secondary"
                color="#6B7280"
                description="Secondary text color"
              />
              <ColorSwatch
                name="Text Muted"
                color="#9CA3AF"
                description="Muted text color"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dark Theme</CardTitle>
              <CardDescription>Dark mode colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Background"
                color="#121212"
                description="Dark mode background"
              />
              <ColorSwatch
                name="Card Background"
                color="#1F2937"
                description="Dark mode card background"
              />
              <ColorSwatch
                name="Text Primary"
                color="#FFFFFF"
                description="Dark mode text"
              />
              <ColorSwatch
                name="Text Secondary"
                color="#9CA3AF"
                description="Dark mode secondary text"
              />
              <ColorSwatch
                name="Text Muted"
                color="#6B7280"
                description="Dark mode muted text"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Status Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ColorVariations
            name="Success"
            colors={{
              DEFAULT: "#28A745",
              hover: "#218838",
              active: "#1E7E34",
              light: "#34CE57",
              dark: "#1E7E34",
            }}
            description="Success states"
          />
          <ColorVariations
            name="Error"
            colors={{
              DEFAULT: "#DC3545",
              hover: "#C82333",
              active: "#BD2130",
              light: "#E4606D",
              dark: "#BD2130",
            }}
            description="Error states"
          />
          <ColorVariations
            name="Warning"
            colors={{
              DEFAULT: "#FFC107",
              hover: "#E0A800",
              active: "#D39E00",
              light: "#FFD54F",
              dark: "#D39E00",
            }}
            description="Warning states"
          />
          <ColorVariations
            name="Info"
            colors={{
              DEFAULT: "#17A2B8",
              hover: "#138496",
              active: "#117A8B",
              light: "#1FC8E3",
              dark: "#117A8B",
            }}
            description="Info states"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Role Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorVariations
            name="Client"
            colors={{
              DEFAULT: "#62BC7C",
              hover: "#559F6D",
              active: "#4A8B5E",
              light: "#7BCA8F",
              dark: "#4A8B5E",
            }}
            description="Client role indicators"
          />
          <ColorVariations
            name="Developer"
            colors={{
              DEFAULT: "#4A90E2",
              hover: "#357ABD",
              active: "#2A5F94",
              light: "#6BA5E7",
              dark: "#2A5F94",
            }}
            description="Developer role indicators"
          />
          <ColorVariations
            name="Admin"
            colors={{
              DEFAULT: "#9333EA",
              hover: "#7E22CE",
              active: "#6B21A8",
              light: "#A855F7",
              dark: "#6B21A8",
            }}
            description="Admin role indicators"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Focus States</CardTitle>
              <CardDescription>Focus and ring colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Focus"
                color="#62BC7C"
                description="Focus state color"
              />
              <ColorSwatch
                name="Focus Ring"
                color="#62BC7C"
                description="Focus ring color"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Borders</CardTitle>
              <CardDescription>Border colors for different themes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Light Border"
                color="#E5E7EB"
                description="Light theme border"
              />
              <ColorSwatch
                name="Dark Border"
                color="#374151"
                description="Dark theme border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active States</CardTitle>
              <CardDescription>Active navigation colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Active"
                color="#62BC7C"
                description="Active navigation item"
              />
              <ColorSwatch
                name="Active Hover"
                color="#559F6D"
                description="Active item hover state"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inactive States</CardTitle>
              <CardDescription>Inactive navigation colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorSwatch
                name="Inactive"
                color="#6B7280"
                description="Inactive navigation item"
              />
              <ColorSwatch
                name="Inactive Hover"
                color="#4B5563"
                description="Inactive item hover state"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 