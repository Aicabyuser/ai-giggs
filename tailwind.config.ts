import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'sans-serif'],
			},
			colors: {
				border: {
					DEFAULT: 'hsl(var(--border))',
					light: "#E5E7EB",
					dark: "#374151",
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					light: "#F5F5F5",
					dark: "#121212",
					card: {
						light: "#FFFFFF",
						dark: "#1F2937",
					},
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: "#62BC7C",
					hover: "#559F6D",
					active: "#4A8B5E",
					light: "#7BCA8F",
					dark: "#4A8B5E",
					50: "#F0FBF3",
					100: "#E1F7E7",
					200: "#C3EFCF",
					300: "#A5E7B7",
					400: "#87DF9F",
					500: "#62BC7C",
					600: "#4A8B5E",
					700: "#315A40",
					800: "#192D22",
					900: "#0C1604",
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: "#F5F5F5",
					hover: "#E5E5E5",
					active: "#D4D4D4",
					light: "#FFFFFF",
					dark: "#E5E5E5",
					50: "#FFFFFF",
					100: "#FAFAFA",
					200: "#F5F5F5",
					300: "#E5E5E5",
					400: "#D4D4D4",
					500: "#F5F5F5",
					600: "#E5E5E5",
					700: "#A3A3A3",
					800: "#737373",
					900: "#525252",
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					light: "#9CA3AF",
					dark: "#6B7280",
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				text: {
					primary: {
						light: "#2C2C2C",
						dark: "#FFFFFF",
					},
					secondary: {
						light: "#6B7280",
						dark: "#9CA3AF",
					},
					muted: {
						light: "#9CA3AF",
						dark: "#6B7280",
					},
				},
				success: {
					DEFAULT: "#28A745",
					hover: "#218838",
					active: "#1E7E34",
					light: "#34CE57",
					dark: "#1E7E34",
				},
				error: {
					DEFAULT: "#DC3545",
					hover: "#C82333",
					active: "#BD2130",
					light: "#E4606D",
					dark: "#BD2130",
				},
				warning: {
					DEFAULT: "#FFC107",
					hover: "#E0A800",
					active: "#D39E00",
					light: "#FFD54F",
					dark: "#D39E00",
				},
				info: {
					DEFAULT: "#17A2B8",
					hover: "#138496",
					active: "#117A8B",
					light: "#1FC8E3",
					dark: "#117A8B",
				},
				client: {
					DEFAULT: "#62BC7C",
					hover: "#559F6D",
					active: "#4A8B5E",
					light: "#7BCA8F",
					dark: "#4A8B5E",
				},
				developer: {
					DEFAULT: "#4A90E2",
					hover: "#357ABD",
					active: "#2A5F94",
					light: "#6BA5E7",
					dark: "#2A5F94",
				},
				admin: {
					DEFAULT: "#9333EA",
					hover: "#7E22CE",
					active: "#6B21A8",
					light: "#A855F7",
					dark: "#6B21A8",
				},
				focus: {
					DEFAULT: "#62BC7C",
					ring: "#62BC7C",
				},
				nav: {
					active: "#62BC7C",
					inactive: "#6B7280",
					background: "#FFFFFF",
					hover: {
						active: "#559F6D",
						inactive: "#4B5563",
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-out': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(20px)', opacity: '0' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'fade-out': 'fade-out 0.4s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-out': 'slide-out 0.5s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
