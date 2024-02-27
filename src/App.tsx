import { QueryClient, QueryClientProvider as Provider, useQuery } from "react-query";

const queryClient = new QueryClient();

interface DataProps {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
}

const App = () => {
  return (
    <Provider client={queryClient}>
      <Example />
    </Provider>
  );
};

const Example = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => { console.log(res); }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred : " + error;

  return (
    <div>
      {/* <h1>{data.na  {data.forks_count}</strong> */}
    </div>
  );
}

export default App;
