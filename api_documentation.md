# VeloFolio RTK Query API Architecture

This document maps out the finalized Redux Toolkit (RTK) Query architecture for VeloFolio, standardizing all data fetching and mutation processes. 

## 🏗 Directory Structure

All API configurations are located in `src/store/apis/`.

| Slice File | Purpose | Key Caching Tags |
|---|---|---|
| `Auth.ts` *(existing)* | Authentication, registration, OTPs, session management. | None |
| `Common.ts` *(existing)* | Organization bootstrapping and invitations. | `Organization` |
| `ClientApi.ts` *(new)* | Client CRUD operations, retrieval, and profile data. | `Client` |
| `JobApi.ts` *(new)* | Job, Shoot, and Task management. | `Job`, `Task` |
| `TeamApi.ts` *(new)* | Team member directory, profiles, assignments, and time-off. | `TeamMember`, `TimeOff` |
| `InvoiceApi.ts` *(new)* | Invoicing, quotation, package processing, and payments. | `Invoice`, `Quote`, `Payment` |

---

## 🚀 Newly Added Slices

### 1. `ClientApi.ts`
Designed to handle the Client CRM functionalities.
* **Endpoints:**
  * `getClients(params?)` — Retrieve client list with pagination/filters.
  * `getClientById(id)` — Single client profile.
  * `updateClient({id, ...body})` — Update details or settings.
  * `deleteClient(id)` — Remove a client.

### 2. `JobApi.ts`
Manages the core productivity domain — jobs, ceremonies/shoots, and task lists.
* **Job Endpoints:** `getJobs`, `createJob`, `updateJob`, `deleteJob`
* **Task Endpoints:** `getTasks`, `createTask`, `updateTask`, `deleteTask`
* **Cache Tagging:** Auto-invalidates `Job` or `Task` caches on mutations so calendar/list views re-fetch seamlessly.

### 3. `TeamApi.ts`
Manages the organizational staffing, permissions, profiles, and PTO records.
* **Team Endpoints:** `getTeamMembers`, `getTeamMemberById`, `updateTeamMember`, `deleteTeamMember`
* **PTO Endpoints:** `requestTimeOff`, `getTimeOffs`

### 4. `InvoiceApi.ts`
Handles all financials linked to jobs/clients.
* **Invoices:** `getInvoices`, `getInvoiceById`, `createInvoice`, `updateInvoice`
* **Quotes:** `getQuotes`, `createQuote`
* **Payments:** `recordPayment` (Auto-validates both the `Payment` and `Invoice` caches).

---

##  `store.ts` Configuration

The `configureStore` setup now bridges existing auth/persist slices with the new RTK Query APIs.

```typescript
// Example snippet of the integrations inside src/store/store.ts
export const store = configureStore({
  reducer: {
    persisted: persistedReducer, 
    [Auth.reducerPath]: Auth.reducer,
    [Common.reducerPath]: Common.reducer,
    [ClientApi.reducerPath]: ClientApi.reducer,
    // ... plus JobApi, TeamApi, InvoiceApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(Auth.middleware)
      .concat(ClientApi.middleware)
      // ... plus all other middlewares
});
```

##  Usage in Components

When writing UI components, import the auto-generated hooks directly.

```tsx
import { useGetJobsQuery, useCreateTaskMutation } from '@/store/apis/JobApi';

export default function Dashboard() {
  const { data: jobs, isLoading } = useGetJobsQuery({ status: 'ACTIVE' });
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();

  // Usage: createTask({ title: 'Edit Photos', jobId: '123' })
}
```

###  Best Practices
1. **Never manual fetch:** Replace all `fetch` or `axios` operations with an RTK Query hook. 
2. **Invalidation:** If you add an endpoint that alters server data, make sure to add `invalidatesTags: ["YourModelTag"]` to notify the getters that their cache is stale.
3. **Persist State:** The `.persisted` reducer saves the Redux state to localStorage (currently Whitelisting `auth` and `invoiceandQuote`). RTK query caches generally handle their own expiration automatically without local persistence.
