import axios from "axios";
import React, { useState } from "react";
import {
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PreContent from "../components/pre-content/PreContent";

// Dependent Queries: 특정 값 있을 때 fetch 해야 할 경우, skip 같이 쓸 수 있을 듯
// https://react-query.tanstack.com/guides/dependent-queries
// Displaying Global Background Fetching Loading State: fetching 중일 때 글로벌 영역에서 표시할 수 있도록
// https://react-query.tanstack.com/guides/background-fetching-indicators#displaying-global-background-fetching-loading-state

//   if (repoData.isLoading) {
//     return <div>"Loading..."</div>;
//   }
//   // 그냥 error 로 체크하면 this doesn't work because: Object is of type 'unknown'.ts(2571) 로 인해 message 를 사용할 수 없음
//   // instanceof Error 를 통해 narrowing 하면 message 사용 가능
//   if (repoData.error) {
//     const message =
//       repoData.error instanceof Error ? repoData.error.message : null;
//     return <div>{`An error has occurred${message && `: ${message}`}`}</div>;
//   }
//   if (!repoData.isSuccess) {
//     // Type Narrowing => 성공했음을 보장하므로 data 를 옵셔널 체이닝 없이 쓸 수 있음
//     return <div>Failed Data Fetching</div>;
//   }
//   if (repoData.isFetching) {
//     return <div>Updating...</div>;
//   }

// While most utilities like axios or graphql-request automatically throw errors for unsuccessful HTTP calls, some utilities like fetch do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular fetch API:
// axios 쓰면 따로 error 문구 작성은 안해도 되고, fetch 를 사용하면 직접 명시
// https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default
//   try {
//     const response = await axios.get(
//       "https://api.github.com/repos/tannerlinsley/react-query"
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch Data");
//   }

type FetchDataType = {
  name: string;
  description: string;
  subscribers_count: string;
  stargazers_count: string;
  forks_count: string;
};

type PageDataType = FetchDataType & {
  hasMore: boolean;
};

async function fetchRepoData(): Promise<FetchDataType> {
  const response = await axios.get(
    "https://api.github.com/repos/tannerlinsley/react-query"
  );
  return response.data;
}

type UpdateRepoData = { id: number; title: string };
function updateRepoData(params: UpdateRepoData) {
  return axios.post(
    "https://api.github.com/repos/tannerlinsley/react-query",
    params
  );
}

async function fetchPage(page: number): Promise<PageDataType> {
  const response = await axios.get(
    `https://api.github.com/repos/tannerlinsley/react-query?page=${page}`
  );
  return response.data;
}

function useRepoData() {
  //   return useQuery<FetchDataType, Error>("repoData", fetchRepoData, {
  //     keepPreviousData: true,
  //     // refetchOnMount: true, 안해도 되는 듯? default 가 true
  //   });
  return useQuery<FetchDataType, Error>({
    queryKey: "repoData",
    queryFn: fetchRepoData,
  });
}

function useRepoNameData(name?: string) {
  return useQuery("repoData", fetchRepoData, {
    select: (data) => data.name, // 필요한것만 꺼내올 수 있는 기능인듯?
    enabled: Boolean(name),
  });
}

type QueryHooksParams<T> = {
  queryKey?: QueryKey;
  queryFn?: QueryFunction<T, QueryKey>;
};

function usePagination<T>({ queryKey, queryFn }: QueryHooksParams<T>) {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    keepPreviousData: true,
  });
}
/** custom hook for handle pagination about repo page */
function useSimplePagination(page: number) {
  return useQuery<PageDataType, Error>({
    queryKey: "pagination",
    queryFn: () => fetchPage(page),
    keepPreviousData: true,
  });
}

function Stat() {
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const repoData = useRepoData();
  const repoName = useRepoNameData(repoData?.data?.name);
  const pageData = usePagination<PageDataType>({
    queryKey: "page",
    queryFn: () => fetchPage(page),
  });
  const simplePageData = useSimplePagination(page);
  const repoMutation = useMutation<UpdateRepoData, Error, UpdateRepoData>(
    (params) => {
      return axios.post(
        "https://api.github.com/repos/tannerlinsley/react-query",
        params
      );
    }
  );

  const mutation = useMutation("mutation", {
    onMutate: (variables) => {
      // A Mutation is about to happen!
    },
    onError: (error, variables, context: any) => {
      console.log(`${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      // Boom body!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const handlePreviousPage = () => setPage((old) => Math.max(old - 1, 0));
  const handleNextPage = () => {
    if (!pageData.isPreviousData && pageData?.data?.hasMore) {
      setPage((old) => old + 1);
    }
  };

  if (!repoData.isSuccess || !pageData.isSuccess || !repoMutation.isSuccess) {
    const source = [repoData, pageData, repoMutation].find(
      (data) => !data.isSuccess
    );
    if (source === undefined) return null;
    return (
      <PreContent
        isIdle={source.isIdle}
        isLoading={source.isLoading}
        isFetching={"isFetching" in source ? source.isFetching : undefined}
        error={source.error}
      />
    );
  }
  if (repoMutation.isSuccess) alert("success!");
  return (
    <div>
      {<button onClick={() => repoMutation.reset()}>Reset</button>}
      <h1>{repoData.data.name}</h1>
      <p>{repoData.data.description}</p>
      <strong>👀 {repoData.data.subscribers_count}</strong>{" "}
      <strong>✨ {repoData.data.stargazers_count}</strong>{" "}
      <strong>🍴 {repoData.data.forks_count}</strong>
      <div>Page Data</div>
      <div>{pageData.data.name}</div>
      <span>Current Page: {page + 1}</span>
      <button onClick={handlePreviousPage} disabled={page === 0}>
        Previoud Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
      <button
        onClick={() => repoMutation.mutate({ id: 0, title: "Do Laundry" })}
      >
        Create Todo
      </button>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default Stat;
