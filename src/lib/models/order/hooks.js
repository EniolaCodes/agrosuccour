import { backendFetch } from "@/lib/core/client";
import { useQuery } from "@tanstack/react-query";

function getLocalStorageItem(key) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null;
}


export const useGetUserOrder = ({params}) => {
  // const token = getCookie(USER_TOKEN);
  const token = getLocalStorageItem("token");

  const fetchUserOrder = () =>
    backendFetch({
    // ehttp://localhost:3100/user/order/?recent=true
      endpoint: `/user/order/${params}`,
      token: token
    });

  return useQuery({
    queryKey: ["FETCH_USER_ORDER"],
    queryFn: () => fetchUserOrder(),
    ...{
      staleTime: Infinity,
    },
  });
};
