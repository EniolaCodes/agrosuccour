import { backendFetch } from "@/lib/core/client";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({options, params}) => {
    // const token = getCookie(USER_TOKEN);
console.log('OUR GREAT PARAM', params)
    const fetchProducts = () =>
        backendFetch({
            endpoint: `/product/${params}`,
            // token: token
        });

    return useQuery({
        queryKey: ["FETCH_PRODUCT_LIST"],
        queryFn: () => fetchProducts(),
        ...{
            staleTime: Infinity,
            ...options
        }
    });
};

// To be used later on
// export const useGetSingleProducts = ({poductId, options}) => {
//     // const token = getCookie(USER_TOKEN);

    // const params = `?limit=10&page=${page}`
    // endpoint: `/poduct/${poductId}/orders/${params}`,

//     const fetchProducts = () =>
//         backendFetch({
//             endpoint: `/user/${poductId}/remove/`,
//             token: token
//         });

//     return useQuery({
//         queryKey: ["FETCH_PRODUCT_LIST", poductId],
//         queryFn: () => fetchProducts(),
//         ...{
//             staleTime: Infinity,
//             enabled: !!poductId,
//             ...options
//         }
//     });
// };