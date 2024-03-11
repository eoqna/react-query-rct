import axios from "axios";
import { QueryClient, QueryClientProvider as Provider, useQuery, useMutation } from "react-query";
import axiosClient from "./util/axiosClient";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider client={queryClient}>
      <Example />
    </Provider>

  );
};

const Example = () => {
  const posting = async () => {
    const url = "/api/kiosk/beta/parking/kiosk-list";
    const payload = { data };
    await axiosClient.post(url, payload)
            .then(el => console.log(el.data))
            .catch(err => console.log(err));
  };

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(posting, {
    onSuccess: async () => {
      // 캐시가 있는 모든 쿼리 무효화
      await queryClient.invalidateQueries();
      
      // queryKey가 'super-heroes'로 시작하는 모든 쿼리 무효화
      await queryClient.invalidateQueries('posts');
    }
  });

  console.log(`isLoading: ${isLoading}, isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`);

  // const { data } = useMutation(
  //   (data) => axiosClient.post('/api/kiosk/beta/parking/kiosk-list', { data }),
  //   {
  //     // Post 요청이 성공하면 위 useQuery의 데이터를 초기화합니다.
  //     // 데이터가 초기화되면 useQuery는 서버의 데이터를 다시 불러옵니다.
  //     onSuccess: () => queryClient.invalidateQueries('getMenu'),
  //   },
  // );

  console.log(data);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && <h1>Success</h1>}
      {isError && <h1>Error</h1>}
      <button onClick={() => mutate()}>데이터 포스팅!</button>
    </div>
  );
}

export default App;
