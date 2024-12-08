import { backendFetch } from "@/lib/core/client";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({ options }) => {
  // const token = getCookie(USER_TOKEN);

  const fetchProducts = () =>
    backendFetch({
      endpoint: `/product/`,
      // token: token
    });

  return useQuery({
    queryKey: ["FETCH_PRODUCT_LIST"],
    queryFn: () => fetchProducts(),
    ...{
      staleTime: Infinity,
      ...options,
    },
  });
};

export const useGetSingleProducts = ({ productId }) => {
  console.log("OUR GREAT PARAM", productId);
  const fetchProducts = () =>
    backendFetch({
      endpoint: `/product/${productId}`,
      // token: token
    });

  return useQuery({
    queryKey: ["FETCH_PRODUCT_DETAIL"],
    queryFn: () => fetchProducts(),
    ...{
      staleTime: Infinity,
    },
  });
};
