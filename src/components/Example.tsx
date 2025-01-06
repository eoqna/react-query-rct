import { QueryClient, useMutation } from "react-query";
import axiosClient from "../util/axiosClient";
import { useState } from "react";

const Example = ( props: { queryClient: QueryClient } ) => {
  const { queryClient } = props;
  const [ kiosk, setKiosk ] = useState<ApiResponse.LotProps[]>([]);
  const posting = async () => {
    const url = "/api/kiosk/beta/parking/available-lots";
    const payload = { data };
    await axiosClient.post(url, payload)
            .then(el => {
              setKiosk(el.data.list); 
              console.log(el.data.list)
            })
            .catch(err => console.log(err));
  };

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(posting, {
    onSuccess: async () => {
      // 캐시가 있는 모든 쿼리 무효화
      await queryClient.invalidateQueries();
      
      // queryKey가 'super-heroes'로 시작하는 모든 쿼리 무효화
      await queryClient.invalidateQueries('api');
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

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && <h1>Success</h1>}
      {isError && <h1>Error</h1>}
      <table style={{ border: "1px solid #ccc"}}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc" }}>flor_id</th>
            <th style={{ border: "1px solid #ccc" }}>flor_nm</th>
            <th style={{ border: "1px solid #ccc" }}>normal_avail_lots</th>
            <th style={{ border: "1px solid #ccc" }}>disabled_avail_lots</th>
            <th style={{ border: "1px solid #ccc" }}>women_avail_lots</th>
            <th style={{ border: "1px solid #ccc" }}>lightcar_avail_lots</th>
            <th style={{ border: "1px solid #ccc" }}>evcar_avail_lots</th>
            <th style={{ border: "1px solid #ccc" }}>vip_avail_lots</th>
          </tr>
        </thead>
        <tbody>
          {kiosk && kiosk.map((item) => (
            <tr key={item.flor_id} style={{ textAlign: "center" }}>
              <td style={{ border: "1px solid #ccc" }}>{item.flor_id}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.flor_nm}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.normal_avail_lots}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.disabled_avail_lots}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.women_avail_lots}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.lightcar_avail_lots}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.evcar_avail_lots}</td>
              <td style={{ border: "1px solid #ccc" }}>{item.vip_avail_lots}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => mutate()}>데이터 포스팅!</button>
    </div>
  );
};

export default Example;