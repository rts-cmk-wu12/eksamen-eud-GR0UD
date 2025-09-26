# SwapHub Dokumentation

**Marks Galkins - WU12**

Jeg har valgt opgave [C](/projekt/src/components/forms/signUp/index.jsx)

## Sådan kommer du i gang

For at starte både backend (API) og frontend (Next.js app), følg disse trin:

### 1. Start API-serveren

Åbn en terminal og kør:

```bash
cd api
npm install
npm start
```

### 2. Start frontend-projektet

Åbn en ny terminal og kør:

```bash
cd projekt
npm install
npm run dev
```

## Tech Stack & Valg

- **Next.js 15** - React framework med App Router
  - _Valg_: Automatisk code splitting, server-side rendering (SSR), og file-based routing og @/utils er mega fedt!!
  - _Alternativ_: React + Vite (mere konfiguration krævet)
- **React 19** - Moderne React komponenter
  - _Valg_: useActionState hook til form håndtering, bedre performance
  - _Alternativ_: Vue.js (mindre learning curve, bare for og ha i portfolien)
- **SASS** - CSS preprocessing
  - _Valg_: Nested CSS, variables, mixins for bedre struktur
  - _Alternativ_: TailwindCSS (hurtigere udvikling, men større bundle size)
- **Zod** – Validerer brugerinput og API-data
  - _Valg_: TypeScript-like validation i JavaScript, konsistent mellem client/server
  - _Alternativ_: Yup eller built-in browser validation
- **REST-API** – Lokalt REST API med Express.js og SQLite

## Biblioteker

- **React Icons** – For at holde ikonerne konsistente.

- **react-toastify** – Til feedback/notifikationer i UI.

## Code Splitting Demonstration

Projektet er opdelt i moduler gennem Next.js App Router struktur. Her er et eksempel på hvordan komponenter er opdelt:

[@components/listing/index.jsx](/projekt/src/components/listing/index.jsx)

```jsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { IoSearch } from "react-icons/io5";
import Pagination from "../pagination";
import Link from "next/link";

export default function Listing() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading } = useFetch("/listings");

  const filteredItems = useMemo(() => {
    let result = Array.isArray(data) ? data : [];
    if (search) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [data, search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings</div>;

  return (
    <div className="listing">
      <div className="listing__controls">
        <input
          className="listing__search"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="listing__grid">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/details/${item.id}`}>
            <div className="listing__item">
              <Image
                src={item.asset?.url || "/images/placeholder.svg"}
                alt={item.title}
                width={300}
                height={200}
                loading="lazy"
                className="listing__img"
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## Forklaring af Koden

Denne komponent viser hvordan jeg har implementeret dynamisk indhold fra API'et:

1. **useFetch hook**: Henter data fra `/listings` endpoint på API'et
2. **State management**: Bruger React hooks til at håndtere søgning og filtrering
3. **Dynamic rendering**: Viser listings baseret på data fra API'et
4. **Error handling**: Håndterer loading states og fejl
5. **Client-side interaktivitet**: Søgefunktionalitet der filtrerer resultater i real-time
6. **Lazy loading**: Next.js `<Image>` komponenten sørger automatisk for kun at loade billeder, når de er synlige på skærmen.

Komponenten er opdelt i mindre dele som Pagination og bruger custom hooks som useFetch, hvilket demonstrerer code splitting principper. Data kommer dynamisk fra backend API'et og opdaterer UI'en automatisk.

## Ændringer/Valg jeg har taget

**Filter system** – Jeg har forbedret filtersystemet, så brugeren nu kan sortere listerne alfabetisk (A-Z og Z-A) og har beholdt "New".

```jsx
const sortItems = (a, b, type) => {
  switch (type) {
    case "alpha-asc":
      return (a.title || "")
        .toLowerCase()
        .localeCompare((b.title || "").toLowerCase());
    case "alpha-desc":
      return (b.title || "")
        .toLowerCase()
        .localeCompare((a.title || "").toLowerCase());
    case "new":
      return new Date(b.createdAt) - new Date(a.createdAt);
    default:
      return 0;
  }
};
```

## POST Request Implementation

Projektet sender data til API'et gennem flere formularer. Her er et eksempel på newsletter signup:

```js
export async function subscribeToNewsletter(prevState, formData) {
  const email = formData.get("email");

  const parseResult = emailSchema.safeParse({ email: email.trim() });
  if (!parseResult.success) {
    return { success: false, error: "You must enter a valid email" };
  }

  try {
    const response = await fetch("http://localhost:4000/api/v1/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    return response.status === 204
      ? { success: true }
      : { success: false, error: await response.text() };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
```

**Andre POST endpoints implementeret:**

- User registration (`/api/v1/users`)
- User authentication (`/auth/token`)
- Profile opdatering (`/api/v1/users/:id`)

## Performance Optimeringer

**1. Lazy Loading**

- Next.js `<Image>` komponenter loader kun billeder når synlige
- Automatisk WebP konvertering og responsive images

**2. Pagination**

- Kun 8 items vises ad gangen for at reducere DOM størrelse
- Client-side pagination for bedre brugeroplevelse

**3. Memoization**

```jsx
const filteredItems = useMemo(() => {
  let result = Array.isArray(data) ? data : [];
  // Filtering og sorting logic
  return result;
}, [data, search, filter]);
```

**4. Debounced Search**

- Real-time søgning uden API kald pr. keystroke

## Error Handling

- Loader/error states i UI.

- Zod validation på både client og server.

- Toast feedback til brugeren.

- Fallback billeder og graceful degradation hvis API fejler.

## Fremtidige Forbedringer

**API Forbedringer:**

- Mere strukturerede API endpoints
- Admin-funktioner til at hente alle brugere
- Bedre API-responses med flere detaljer

**Styling & UX:**

- Dark/light mode toggle
- Mobile responsiveness på alle sider

---

**Credit til:** [Awesome README](https://github.com/matiassingers/awesome-readme?tab=readme-ov-file)

_Denne guide har hjulpet mig med at forstå, hvordan man strukturerer og skriver en god dokumentation/README._

**Marks Galkins - WU12**  
_SwapHub - Eksamensprojekt 2025_
