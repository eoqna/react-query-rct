import { QueryClient, QueryClientProvider as Provider } from "react-query";
import Example from "./components/Example";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider client={queryClient}>
      <Example queryClient={queryClient} />
    </Provider>
  );
};

export default App;
