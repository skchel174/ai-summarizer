import { OrderTypes } from "@/shared/api/api.types";
import { useSearchParams } from "react-router-dom";
import {
  SummarizationScopes,
  SummarizationSourceTypes,
  SummarizationStatuses,
  type SummarizationListParams,
} from "./summarization-list.types";

const PARAM_KEYS = [
  "page",
  "perPage",
  "order",
  "search",
  "scope",
  "sourceType",
  "status",
  "tagIds",
] satisfies (keyof SummarizationListParams)[];

const MAX_PER_PAGE = 100;

const DEFAULT_PARAMS = {
  page: 1,
  perPage: 10,
  order: OrderTypes.Desc,
} satisfies Pick<SummarizationListParams, "page" | "perPage" | "order">;

export function useSummarizationParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedParams = parseSummarizationListParams(searchParams);

  const updateParams = (
    paramsPatch: Partial<Omit<SummarizationListParams, "page">>,
  ) => {
    const updatedParams = updateUrlSearchParams(searchParams, paramsPatch);
    updatedParams.delete("page");
    setSearchParams(updatedParams);
  };

  const resetParams = () => {
    setSearchParams((currentParams) => {
      const params = new URLSearchParams(currentParams);
      PARAM_KEYS.forEach((param) => params.delete(param));
      return params;
    });
  };

  const setPage = (page: number) => {
    if (!Number.isInteger(page) || page < 1) {
      return;
    }

    const urlSearchParams = new URLSearchParams(searchParams);

    if (page === DEFAULT_PARAMS.page) {
      urlSearchParams.delete("page");
    } else {
      urlSearchParams.set("page", String(page));
    }

    setSearchParams(urlSearchParams);
  };

  const params = {
    ...DEFAULT_PARAMS,
    ...parsedParams,
  };

  return {
    params,
    setPage,
    updateParams,
    resetParams,
  };
}

function updateUrlSearchParams(
  urlParams: URLSearchParams,
  paramsPatch: Partial<SummarizationListParams>,
) {
  const urlSearchParams = new URLSearchParams(urlParams);

  Object.entries(paramsPatch).forEach(([key, value]) => {
    urlSearchParams.delete(key);

    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        urlSearchParams.append(key, String(item));
      });
      return;
    }

    urlSearchParams.set(key, String(value));
  });

  return urlSearchParams;
}

function parseSummarizationListParams(
  urlParams: URLSearchParams,
): SummarizationListParams {
  const params: SummarizationListParams = {};

  const page = parsePosInt(urlParams.get("page"));
  if (page) {
    params.page = page;
  }

  const perPage = parsePosInt(urlParams.get("perPage"), MAX_PER_PAGE);
  if (perPage) {
    params.perPage = perPage;
  }

  const order = urlParams.get("order");
  if (isEnumValue(order, OrderTypes)) {
    params.order = order;
  }

  const search = urlParams.get("search")?.trim();
  if (search) {
    params.search = search;
  }

  const scope = urlParams.get("scope");
  if (isEnumValue(scope, SummarizationScopes)) {
    params.scope = scope;
  }

  const sourceType = urlParams.get("sourceType");
  if (isEnumValue(sourceType, SummarizationSourceTypes)) {
    params.sourceType = sourceType;
  }

  const status = urlParams.get("status");
  if (isEnumValue(status, SummarizationStatuses)) {
    params.status = status;
  }

  const tagIds = Array.from(
    new Set(
      urlParams
        .getAll("tagIds")
        .map(parsePosInt)
        .filter((tagId) => tagId !== undefined),
    ),
  );

  if (tagIds.length > 0) {
    params.tagIds = tagIds;
  }

  return params;
}

function parsePosInt(value: string | null, max?: number): number | undefined {
  if (value === null || value.trim() === "") {
    return undefined;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return undefined;
  }

  if (max !== undefined && parsedValue > max) {
    return undefined;
  }

  return parsedValue;
}

function isEnumValue<T extends Record<string, string>>(
  value: string | null,
  values: T,
): value is T[keyof T] {
  return value !== null && Object.values(values).includes(value as T[keyof T]);
}
