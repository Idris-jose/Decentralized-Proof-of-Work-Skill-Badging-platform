# **App Name**: Douguken Dashboard

## Core Features:

- Sidebar Navigation: Persistent sidebar with links to Dashboard, Mint Badge, My Badges, Verify Badge, and Settings.
- Top Bar: Displays the current page title and a 'Connect Wallet' button. Shows shortened wallet address when connected.
- Developer Dashboard: Shows a summary of the user's Skill Badges: Total Badges, Verified Badges, Pending Verification.
- Recent Activity Table: Displays recent activity with columns for Skill, Token ID, Status, Date, and Action buttons.
- Mint Badge Modal: Modal to mint a new badge with fields for Skill name, description, and proof link.
- B2B Verification Dashboard: Allows searching for developers by wallet address or ENS and displays a table for badge verification.
- Verification Modal: Modal to verify a badge with a Token ID field and 'Verify on Blockchain' button.

## Style Guidelines:

- Background: Light gray (#F5F5F5) to provide a clean and neutral base.
- Primary: Emerald green (#3CB371) for buttons, highlights, and status indicators, symbolizing skill validation.
- Accent: Forest green (#228B22) to provide contrast to the Emerald green while remaining within the green hue.
- Body and headline font: 'Inter' (sans-serif) for a modern and professional look.
- Use minimal icons from lucide-react for menu items and status indicators.
- Responsive layout with cards, tables, and modals for desktop and tablet views.
- Subtle loading skeletons for tables and cards to enhance user experience during data loading.