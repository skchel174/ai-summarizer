# AI Summarizer — project instructions

## Project goal

AI Summarizer is a personal web application for processing long-form materials:
articles, transcripts, podcasts, videos, meeting notes, and other large content.

The application should help extract:

- short summaries
- detailed summaries
- key ideas
- action items
- structured notes
- tags and topics
- searchable knowledge snippets

The project should stay practical, readable, and maintainable.
Avoid fake enterprise architecture and unnecessary abstractions.

## Tech stack

### Client

- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query for server-state management
- OpenAPI-generated types may be added later if the API grows

Do not use Redux unless the application clearly needs complex global client state.

### Server

- Node.js
- TypeScript
- Fastify
- SQLite for the first MVP
- Drizzle ORM
- Redis and BullMQ may be added later if background jobs become necessary
- Docker only when it simplifies local infrastructure, not by default

### AI integration

The app may support:

- OpenAI-compatible API providers
- local models later
- prompt templates
- summarization presets
- chunking for long inputs
- structured JSON output from models

AI provider-specific code must be isolated.
Do not hardcode one provider deeply into business logic.

## Architecture approach

Use Evolution Design.

Start simple.
Add structure only when the project actually needs it.
Do not use Feature-Sliced Design.
Do not use deep DDD.

The main rule:

> Keep code easy to move, easy to delete, and easy to understand.

## Client architecture

Use a simple feature-oriented structure.

Suggested initial structure:

```txt
src/
  app/
    App.tsx
    main.tsx
    router.tsx
    providers.tsx

  pages/
    home/
      HomePage.tsx
    sources/
      SourcesPage.tsx
    summary/
      SummaryPage.tsx

  features/
    source-upload/
      SourceUploadForm.tsx
      useUploadSource.ts

    summary-generation/
      GenerateSummaryButton.tsx
      useGenerateSummary.ts

  entities/
    source/
      source.types.ts
      source.api.ts

    summary/
      summary.types.ts
      summary.api.ts

  shared/
    api/
      httpClient.ts
      queryClient.ts

    ui/
      button/
      input/
      textarea/
      card/

    lib/
    config/
    styles/
      index.css
```

### Client rules

- Keep pages thin.
- Keep reusable UI in `shared/ui`.
- Keep API calls close to their entity or feature.
- Use TanStack Query for server-state.
- Use local component state for forms and simple UI state.
- Do not create global state unless it is clearly needed.
- Do not split files just to look architectural.
- Prefer boring readable components.

## Server architecture

Use a simple modular structure.

Suggested initial structure:

```txt
src/
  app/
    server.ts
    config.ts

  modules/
    source/
      source.routes.ts
      source.controller.ts
      source.service.ts
      source.repository.ts
      source.schema.ts
      source.types.ts

    summary/
      summary.routes.ts
      summary.controller.ts
      summary.service.ts
      summary.repository.ts
      summary.schema.ts
      summary.types.ts

    ai/
      ai.service.ts
      ai.types.ts
      providers/
        openai-compatible.provider.ts
      prompts/
        summary.prompt.ts

  shared/
    db/
      client.ts
      schema.ts
      migrations/

    errors/
      AppError.ts

    http/
      errorHandler.ts

    utils/
```

### Server rules

- Routes/controllers handle HTTP only.
- Services contain application logic.
- Repositories work with the database.
- AI provider code stays isolated in the `ai` module.
- Do not leak database rows directly into API responses if response shape differs.
- Validate input at the HTTP boundary.
- Avoid interfaces until there are multiple implementations or real testing pain.
- Avoid DDD terms unless they clarify something.

## Database

Use SQLite for the MVP.

Reasons:

- simple local setup
- good enough for personal usage
- easy to backup
- no database server required
- fast enough for this workload

Use WAL mode for better read/write behavior.

The schema should be written in a way that does not make future migration to PostgreSQL painful.

Avoid SQLite-specific tricks unless there is a strong reason.

Potential future migration target:

- PostgreSQL

Use PostgreSQL later if the app becomes multi-user, needs heavy concurrent writes, advanced full-text search, JSONB-heavy querying, or vector search.

## Git workflow

Use a simple Git workflow.

Main branch:

- `main`

Feature branches:

- `feature/<short-name>`

Fix branches:

- `fix/<short-name>`

Use conventional commits:

- `feat:`
- `fix:`
- `refactor:`
- `chore:`
- `docs:`
- `test:`
- `style:`

Examples:

- `feat: add source upload`
- `feat: add summary generation`
- `fix: handle empty source text`
- `refactor: isolate ai provider`
- `chore: configure tailwind`

Keep commits focused.
Do not mix unrelated changes.

## Coding style

- TypeScript everywhere.
- Prefer explicit types for public functions.
- Avoid `any`.
- Keep abstractions small.
- Prefer functions over classes unless classes make the design clearer.
- Prefer boring code.
- Do not add libraries without a clear reason.
- Do not write poetic UI text.
- UI text should sound practical and human.
