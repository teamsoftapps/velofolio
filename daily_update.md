# Velofolio Development Update - March 24, 2026

## 🚀 Key Improvements & Features Added

### 1. Data Persistence (Critical Fix)
- **Whitelisted Redux Slices**: Added `invoiceandQuote` to the Redux-Persist whitelist. Invoices and Quotes now survive page refreshes and are stored in `localStorage`.
- **Root Reducer Integration**: Consolidated all reducers under a `persisted` root key to ensure unified state management.

### 2. Routing & Security
- **Universal Route Guard**: Implemented a "secure-by-default" RouteGuard in the root layout. All internal pages are now protected, only `/` and `/signin` are public.
- **Smart Redirects**: After logging in, users are now automatically redirected back to the page they were trying to access (using `redirect` query parameter).

### 3. Invoices & Quotes Flow
- **Unified Creation Logic**: Fixed the `ProductsPackage` component to handle both Invoice and Quote creation reliably.
- **Improved Draft Management**:
    - **Delete Item**: Correctly removes a product from the current draft table.
    - **Duplicate Item**: Correctly duplicates an item within the current draft table.
- **Data-Driven View Pages**: Revamped `viewInvoice` and `viewQuote` to fetch and display real data from Redux based on URL IDs instead of hardcoded placeholders.
- **Full Actions**: Implemented **Delete**, **Send**, **Edit**, and **Download** button logic in the view pages.

### 4. Payment Management
- **Functional Split Payments**: Added a working dropdown for "No split", "50/50", and "30/70" payment schedules.
- **Dynamic Schedules**: The payment schedule table now automatically calculates and saves specific dues based on the selected split type and total amount.

### 5. UI/UX Polishing
- **Fixed Tab Rendering**: Resolved a bug in the Job Profile page where the Quotes tab was incorrectly displaying invoice data.
- **Currency Formatting**: Added robust currency formatting throughout the application (`$0.00` format).
- **Bug Fixes**: Resolved multiple `TypeError` crashes related to Redux selector paths.

### 6. Dynamic ID & Date Generation
- **Unique Alphanumeric IDs**: Replaced the hardcoded '20251126-01' with dynamic, session-stable IDs (e.g., `HL2GGYH`).
- **Real-Time Dates**: The "Issue Date" now automatically defaults to the current date instead of being static.
- **Parent-to-Child Sync**: IDs are now generated at the page level and passed down, ensuring consistency between the UI form and the saved database record.

### 7. Public Sharing & Guest Experience
- **Whitelisted Public Views**: Added `/viewInvoice` and `/viewQuote` to the RouteGuard, allowing clients to access shared links without logging in.
- **Branded Guest Navbar**: 
    - Replaced the "Sign In" button with dynamic context (e.g., **"Invoice: #ID"**) for unauthenticated users.
    - Hidden all internal nav tabs (Dashboard, Clients, etc.) for guests to protect privacy.
- **Closing Logic**: Replaced "Back to dashboard" with a functional **"Close View"** button that attempts to close the browser tab for guests.

### 8. Professional Feedback System (Toasts)
- **Toast Notifications**: Replaced all intrusive browser `alert()` calls with modern, branded toasts using `react-toastify`.
- **Integrated Styling**: Configured the root layout to support consistent toast styling across the entire app.
- **Functional Clipboard**: The "Copy link" button now correctly writes the full current URL to the system clipboard and provides instant success feedback.

### 9. Dashboard Layout Modifications
- **Decluttered Analytics**: Removed the "Team Utilization" tab, dataset, and selection options from the main Dashboard Chart to streamline available metrics.
- **Responsive Grid Fix**: Re-engineered the underlying CSS grid (`grid-cols-6` and `sm:grid-cols-3`) to perfectly distribute the remaining 6 analytical cards. This prevents card stretching and ensures the UI remains beautifully responsive on all screen sizes.
- **Specialized UI Components**: Extracted a new, dedicated `DashboardTable.tsx` component from the main heavy data table. This lightweight version scales down font sizes (to 10px-12px) and shrinks row padding, allowing `RecentLeads` and `JobTask` widgets to look clean and neat inside their dashboard cards instead of crashing the layout with huge text.

## 🛠️ Infrastructure Changes
- Updated `RouteGuard.tsx` with whitelisted paths.
- Enhanced `Navbar.tsx` with `guestLabel` props and conditional rendering.
- Integrated `react-toastify` CSS and container into the root `layout.tsx`.
- Standardized ID generation using `useMemo` in Invoice/Quote creation pages.

---
*End of update for today.*

