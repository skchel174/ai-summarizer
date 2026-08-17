# Summarization List Filtering and Pagination Concept

## 1. Purpose

The summarization list must support:

- filtering by scope, source type, processing status, and tags;
- sorting by creation date and potentially other fields later;
- desktop and mobile interaction patterns;
- desktop table and card/grid views;
- mobile card view;
- shareable and restorable filtered URLs;
- server-side filtering, sorting, and pagination;
- manual refresh;
- classic desktop pagination;
- mobile incremental loading.

The implementation should keep filtering logic independent from the visual representation of the list.

The table and card components must only render already fetched data. They must not read URL parameters, build API requests, or control filters.

---

## 2. Main architectural principle

Applied list parameters are stored in the URL.

The URL is the source of truth for:

- active scope;
- search query;
- selected source types;
- selected statuses;
- selected tags;
- sorting;
- desktop page number;
- optional page size.

Example:

    /summaries?scope=starred&type=pdf&status=completed&tags=ai,architecture&sort=addedAt&order=desc&page=2

This makes it possible to:

- bookmark a filtered list;
- share a filtered list;
- redirect to a predefined list state;
- restore filters after a page reload;
- support browser Back and Forward navigation;
- open the page from another part of the application with predefined parameters.

Default values should usually be omitted from the URL.

Preferred:

    /summaries

Avoid:

    /summaries?scope=all&type=all&status=all&sort=addedAt&order=desc&page=1

Missing parameters are replaced with defaults while parsing the URL.

---

## 3. Data flow

The main data flow should be:

    User changes filter controls
        ↓
    Applied parameters are written to the URL
        ↓
    URL parameters are parsed and normalized
        ↓
    Normalized parameters are used in the TanStack Query key
        ↓
    The API request is executed
        ↓
    The response is rendered as a desktop table, desktop cards, or mobile cards

The list does not directly subscribe to individual filter controls.

It reacts to the normalized parameter object derived from the URL.

---

## 4. Applied state and draft state

The system must distinguish between two types of filter state.

### 4.1 Applied filters

Applied filters are represented by URL parameters.

They determine:

- the current API request;
- the visible list;
- active filter indicators;
- the current shareable URL.

Conceptually:

    appliedFilters = parseAndNormalizeSearchParams(urlSearchParams)

### 4.2 Draft filters

Draft filters exist only while the user edits filters before confirming them.

They are primarily required for the mobile filter sheet.

Conceptually:

    draftFilters = local temporary state

Draft filters do not affect the URL or trigger API requests until the user presses `Apply filters`.

---

## 5. Desktop filtering behavior

Desktop filters are permanently visible and should usually apply immediately.

Example:

    Status: All → Completed
        ↓
    URL is updated
        ↓
    Page is reset to 1
        ↓
    Query key changes
        ↓
    The list is requested again

Immediate application is appropriate for:

- scope tabs;
- source type;
- status;
- tag selection;
- sort field;
- sort order;
- page size.

Text input should normally be debounced.

Examples:

- global search query;
- tag search inside a large tag selector.

Select controls and buttons do not need a debounce delay.

The desktop filter component should not directly call the API. It should update applied URL parameters.

---

## 6. Mobile filtering behavior

Mobile filters are edited inside a Bottom Sheet.

When the sheet opens:

    draftFilters = appliedFilters

The user can change multiple fields without triggering requests.

Example:

    Open filter sheet
        ↓
    Change type
        ↓
    Change status
        ↓
    Select several tags
        ↓
    Change sorting
        ↓
    Press Apply filters
        ↓
    Draft filters are written to the URL
        ↓
    Page state is reset
        ↓
    The list is requested again

If the sheet is closed without applying:

- draft changes are discarded;
- the URL remains unchanged;
- the current list remains unchanged.

The `Reset all` action should reset the draft state while the sheet is open.

The reset should only affect the applied list after the user confirms it with `Apply filters`.

A separate `Clear all` action outside the sheet may immediately remove active applied filters.

---

## 7. Shared behavior without forcing identical components

Desktop and mobile filters have the same domain meaning but different interaction models.

Do not force both versions into one large component controlled by numerous flags such as:

    isMobile
    applyImmediately
    showApplyButton
    renderAsSheet
    compact
    inline

Prefer separate composed components:

    DesktopSummarizationFilters
    MobileSummarizationFiltersSheet

They should share:

- filter types;
- default values;
- URL serialization rules;
- URL parsing rules;
- validation and normalization;
- option configurations;
- low-level reusable controls where practical.

They should not necessarily share the entire rendered component tree.

This avoids creating a supposedly reusable component that is actually two interfaces trapped in the same file.

---

## 8. Suggested parameter model

Use one normalized parameter type for the list.

Conceptually:

    SummarizationListParams

Possible fields:

    scope
    search
    types
    statuses
    tagIds
    sort
    order
    page
    perPage

Possible values:

    scope:
      all
      recent
      starred

    types:
      youtube
      pdf
      web
      text
      transcription

    statuses:
      pending
      processing
      completed
      failed

    sort:
      addedAt
      title

    order:
      asc
      desc

Not every field must support multiple values in the first version.

The type should describe normalized application state, not raw strings from `URLSearchParams`.

---

## 9. URL parsing and normalization

URL parameters are untrusted input.

A dedicated parser should convert raw query parameters into a valid normalized object.

It should handle:

- unknown source types;
- unknown statuses;
- unknown sort fields;
- invalid sort order;
- invalid page values;
- negative page values;
- duplicate tag IDs;
- empty strings;
- obsolete parameters from older application versions.

Examples:

    page=-5
        → page=1

    status=finished
        → ignored or replaced with default

    tags=ai,ai,architecture
        → ["ai", "architecture"]

    sort=random
        → addedAt

The parser should define all defaults in one place.

Do not parse and validate URL parameters independently inside individual components.

---

## 10. URL serialization

A dedicated serializer should convert normalized parameters back into URL search parameters.

It should:

- omit default values;
- remove empty arrays;
- remove empty search strings;
- use stable parameter names;
- preserve unrelated parameters only when intentionally required;
- produce predictable URLs.

Three transformations should remain conceptually separate:

    URL → normalized list parameters

    normalized list parameters → URL

    normalized list parameters → API request parameters

The URL format and API request format may initially be similar, but they should not be treated as permanently identical.

---

## 11. Page reset rules

The current page must reset when the result set meaning changes.

Reset to the first page when any of these change:

- scope;
- search;
- source type;
- status;
- tags;
- sorting;
- sort order;
- page size.

Example:

    /summaries?status=all&page=7

After selecting `failed`:

    /summaries?status=failed&page=1

Without this rule, the user may remain on a page that does not exist for the filtered result.

Changing only the visual representation must not reset pagination.

Examples that should not change the query page:

- switching desktop table to desktop cards;
- opening or closing the mobile filter sheet;
- expanding a card;
- opening an item action menu.

---

## 12. TanStack Query integration

The normalized parameter object should be part of the query key.

Conceptually:

    ["summarizations", normalizedParams]

When normalized parameters change:

- TanStack Query receives a new query key;
- cached data may be reused;
- otherwise a new API request is executed.

The query hook should be responsible for:

- executing the request;
- loading state;
- error state;
- cached data;
- background refetching;
- request cancellation where supported.

The filter components must not call the API directly.

The refresh button should not change URL parameters.

It should invalidate or refetch the currently active summarization query.

---

## 13. View mode

The list has multiple visual representations:

- desktop table;
- desktop cards or grid;
- mobile cards.

All representations should consume the same list response.

Conceptually:

    query result
        ↓
    items
        ├── SummarizationTable
        ├── SummarizationDesktopCards
        └── SummarizationMobileCards

The selected visual mode does not change the server-side result set.

For desktop, the user may switch between table and card views.

For mobile, cards should be the only supported view unless a real use case later justifies another representation.

The desktop view preference should preferably be stored in local storage rather than the URL because it is a personal presentation preference and does not change the meaning of the shared link.

Possible local value:

    summarization-list-view = "table" | "cards"

---

## 14. Desktop sorting

The desktop table may provide sorting through the `Added` column header.

Example:

    Added ↓

Clicking the header toggles:

    addedAt desc
        ↕
    addedAt asc

The active sorting state must still be represented in the shared normalized parameters and URL.

The column header is only a shortcut for changing the same sorting state used by the desktop filter panel and mobile filter sheet.

There must not be a separate table-only sorting mechanism.

The header should indicate:

- whether the column is active;
- current ascending or descending order;
- accessibility state such as `aria-sort`.

---

## 15. Active filter indicators

Applied filters may be displayed above the result list as removable chips.

Examples:

    Type: PDF ×
    Status: Completed ×
    Tag: architecture ×
    Tag: ai ×

Removing a chip should:

- update the URL;
- reset the page;
- trigger the corresponding query.

A `Clear all` action should remove all non-default applied filters.

The active filter chip list represents applied state, not draft state.

On mobile, this distinction is especially important:

- the Bottom Sheet edits draft filters;
- chips above the list show filters already applied to the result.

---

## 16. Tag filtering

Tags require special consideration because the number of tags may become large.

The tag filter should support:

- multiple selection;
- searching tags;
- selected state;
- a compact representation of applied tags;
- stable tag IDs rather than tag names in API requests.

Tag names are presentation values and may change.

Tag IDs should be used for filtering whenever possible.

Desktop may use a searchable multi-select.

Mobile may show the searchable tag list directly inside the filter sheet if the number of options remains manageable.

If the tag section becomes too large, it can later be extracted into a nested tag selection sheet without changing the underlying filter state model.

Avoid displaying a large uncontrolled collection of selected tag chips inside the mobile form.

A compact summary is preferable:

    architecture, ai +3

or:

    5 tags selected

Applied tags may still be shown as removable chips above the result list.

---

## 17. Component responsibilities

### SummarizationListPage

Responsible for:

- page-level composition;
- reading normalized URL parameters through a dedicated hook;
- executing the list query;
- selecting the appropriate visual representation;
- rendering loading, error, empty, and success states;
- coordinating desktop and mobile pagination behavior.

It should remain reasonably thin.

### SummarizationListToolbar

Responsible for composing:

- scope tabs;
- desktop filters;
- mobile filter button;
- view switch;
- refresh button;
- optional result count.

It should not fetch the list itself.

### DesktopSummarizationFilters

Responsible for:

- rendering permanently visible desktop controls;
- immediately applying changes to the URL;
- resetting the page when required.

### MobileSummarizationFiltersSheet

Responsible for:

- opening and closing the Bottom Sheet;
- creating draft state from applied filters;
- editing draft filters;
- resetting draft filters;
- committing draft filters on Apply;
- discarding draft filters on cancel or close.

### ActiveFilterList

Responsible for:

- displaying applied filters;
- removing one applied filter;
- clearing all applied filters.

### SummarizationListContent

Responsible for selecting and rendering:

- table;
- desktop cards;
- mobile cards;
- loading state;
- error state;
- empty state.

### SummarizationTable

Responsible only for:

- rendering desktop tabular data;
- exposing item actions;
- exposing sortable column headers.

It must not read URL parameters directly.

### SummarizationCards

Responsible only for:

- rendering card data;
- exposing item actions.

It must not read URL parameters directly.

### DesktopPagination

Responsible for:

- classic page navigation;
- reading the current page from normalized applied parameters;
- writing a new page to the URL.

### MobilePagination

Responsible for:

- loading additional result pages;
- appending items;
- showing loading and completion state;
- resetting when applied filters change.

---

## 18. Desktop pagination

Desktop should use classic server-side pagination.

Example:

    Previous  1  2  3  ...  16  Next

The current page should be stored in the URL.

Example:

    /summaries?status=completed&page=3

Changing the page:

- updates the URL;
- replaces the current page of results;
- may scroll the list container to the top;
- preserves all current filters and sorting.

The API response should provide enough metadata for navigation.

Example response metadata:

    page
    perPage
    total
    totalPages

---

## 19. Mobile pagination

Mobile should use incremental loading rather than classic numbered pagination.

Recommended interaction:

    current cards

    Load more

    Showing 20 of 128

Each `Load more` action requests the next page and appends it to the existing list.

The first implementation should prefer an explicit `Load more` button over automatic infinite scroll.

Reasons:

- more predictable behavior;
- easier loading and error handling;
- avoids accidental background loading;
- does not create an endless scrolling trap;
- works better with persistent bottom navigation;
- easier to test;
- easier to make accessible.

The API may continue using ordinary page-based pagination:

    page=1&perPage=20
    page=2&perPage=20
    page=3&perPage=20

Desktop replaces the current page.

Mobile accumulates pages.

---

## 20. Mobile pagination and URL state

Applied filters and sorting should remain in the URL on mobile.

The number of incrementally loaded pages should initially not be encoded in the URL.

Reasons:

A URL such as:

    ?page=4

is ambiguous on mobile.

It could mean:

- display only page 4;
- load pages 1 through 4;
- restore a previous scroll position;
- restore accumulated results.

For the initial implementation:

- mobile starts from the first page;
- subsequent pages are accumulated in query state;
- changing applied filters resets accumulated pages;
- browser navigation restores filters;
- exact scroll position and previously loaded page count are not guaranteed after a full reload.

TanStack Query can still preserve accumulated pages during ordinary navigation when cached state remains available.

Exact scroll restoration can be added later if it becomes a real usability problem.

---

## 21. Query strategy for desktop and mobile

Desktop can use a regular paginated query.

Conceptually:

    useSummarizationListQuery(params)

Mobile can use an infinite query or an equivalent accumulated-page abstraction.

Conceptually:

    useInfiniteSummarizationListQuery(paramsWithoutPage)

Both should use the same API endpoint and the same filtering model.

The difference is only how pages are consumed:

- desktop selects one page;
- mobile appends pages.

Do not duplicate filtering rules between desktop and mobile query hooks.

Shared request parameter construction should be used.

---

## 22. Loading behavior

When filters change, the interface should avoid unnecessarily flashing an empty list.

TanStack Query may keep previous data while the next result is loading.

Recommended feedback:

- preserve the current layout;
- show a subtle loading indicator in the list toolbar or content;
- disable repeated Apply actions while committing;
- show a loading state for `Load more` without blocking existing cards.

Initial page loading and background refetching should be visually distinct.

The refresh button may show a spinning icon while a background refetch is active.

---

## 23. Error behavior

The system should distinguish between:

- initial list load failure;
- filter-triggered refetch failure;
- mobile `Load more` failure;
- tag option loading failure.

Initial failure may replace the content with an error state.

A failed background refetch should preferably preserve the existing data and show a retry message.

A failed mobile `Load more` request should preserve already loaded cards and display a retry action near the bottom.

---

## 24. Empty states

Different empty states should be supported.

### No summarizations exist

Message should encourage adding the first source.

### No results match applied filters

Message should explain that the current filters returned no results.

Possible actions:

- clear filters;
- remove individual filter chips;
- adjust the search query.

The component should distinguish an empty database from an empty filtered result.

---

## 25. API expectations

Filtering, sorting, and pagination should be server-side.

The client should not download the complete summarization collection and filter it locally.

Possible request shape:

    GET /summarizations

Parameters may include:

    scope
    search
    types
    statuses
    tagIds
    sort
    order
    page
    perPage

Possible response shape:

    {
      "items": [],
      "page": 1,
      "perPage": 20,
      "total": 128,
      "totalPages": 7
    }

For mobile incremental loading, the same response shape is sufficient.

Cursor pagination may be introduced later if page-based pagination becomes inefficient or unstable.

It is not necessary for the initial version.

---

## 26. Recommended implementation boundaries

The following concerns should be separated:

### Domain parameter model

Defines valid filter and sorting values.

### URL adapter

Parses and serializes search parameters.

### API adapter

Converts normalized list parameters into API request parameters.

### Query hooks

Fetch and cache server data.

### Filter UI

Allows users to edit applied or draft filters.

### List representations

Render table or cards.

### Pagination UI

Controls desktop pages or mobile incremental loading.

These boundaries are practical and should not be expanded into unnecessary framework-like abstractions.

The project follows Evolution Design, so abstractions should be added only when they remove real duplication or clarify a real responsibility.

---

## 27. Suggested conceptual file structure

The exact structure may evolve, but the initial organization could be:

    src/
      pages/
        summarizations/
          summarization-list.page.tsx

      features/
        summarization-filtering/
          summarization-filter.types.ts
          summarization-filter.defaults.ts
          summarization-filter-url.ts
          use-summarization-filters.ts
          desktop-summarization-filters.tsx
          mobile-summarization-filters-sheet.tsx
          active-filter-list.tsx

        summarization-list-view/
          summarization-view-mode.ts
          use-summarization-view-mode.ts
          summarization-view-switch.tsx

      entities/
        summarization/
          summarization.types.ts
          summarization.api.ts
          summarization.queries.ts

      widgets/
        summarization-list/
          summarization-list.tsx
          summarization-list-toolbar.tsx
          summarization-list-content.tsx
          summarization-table.tsx
          summarization-table-row.tsx
          summarization-cards.tsx
          summarization-cards-item.tsx
          desktop-pagination.tsx
          mobile-load-more.tsx

This structure is a direction, not a mandatory final hierarchy.

Do not move every small component into a separate architectural layer merely to satisfy the diagram.

Keep related files together until the code becomes difficult to navigate.

---

## 28. Core rules

1. The URL is the source of truth for applied filters.

2. Desktop filters apply immediately.

3. Mobile filters use local draft state and apply only after confirmation.

4. Filter controls do not fetch data directly.

5. The query reacts to normalized URL parameters.

6. Filtering, sorting, and pagination are server-side.

7. The table and card views consume the same item model.

8. View mode does not change the fetched result set.

9. Desktop page number is stored in the URL.

10. Mobile additional pages are accumulated locally and are not initially encoded in the URL.

11. Any meaningful filter or sorting change resets pagination.

12. The `Added` table header controls the same shared sorting state used elsewhere.

13. Refresh invalidates the current query without changing filters.

14. Applied filter chips represent URL state, not unconfirmed mobile draft state.

15. Shared domain logic should be reused, while desktop and mobile interfaces may remain separate components.

---

## 29. Initial implementation scope

The first implementation should include:

- URL-based applied filter state;
- scope filtering;
- source type filtering;
- status filtering;
- multi-tag filtering;
- sorting by `addedAt`;
- ascending and descending sort order;
- immediate desktop application;
- mobile draft filters with Apply and Reset;
- active filter chips;
- desktop classic pagination;
- mobile Load more pagination;
- manual query refresh;
- table/card rendering from one response model;
- URL validation and normalization.

The first implementation does not need:

- cursor pagination;
- exact mobile scroll restoration after reload;
- global client state;
- Redux;
- a generic filter framework;
- a universal desktop/mobile filter component;
- deeply abstracted form infrastructure;
- support for every possible future sorting field.

Build the smallest clear implementation that preserves these architectural boundaries.