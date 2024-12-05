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

// export const useGetSingleProducts = ({productId, options}) => {
//     // const token = getCookie(USER_TOKEN);

//     const fetchProducts = () =>
//         backendFetch({
//             endpoint: `/product/${productId}/`,
//             token: token
//         });

//     return useQuery({
//         queryKey: ["FETCH_PRODUCT_LIST", productId],
//         queryFn: () => fetchProducts(),
//         ...{
//             staleTime: Infinity,
//             enabled: !!productId,
//             ...options
//         }
//     });
// };
