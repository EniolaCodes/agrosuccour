import { backendFetch } from "@/lib/core/client";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({options, params}) => {
    // const token = getCookie(USER_TOKEN);
console.log('OUR GREAT PARAM', params)
    const fetchProducts = () =>
        backendFetch({
            endpoint: `/product/${params}`,
            // endpoint: `/product/${params}`,
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

export const useGetTopSellingProducts = ({options, params}) => {
    // const token = getCookie(USER_TOKEN);
console.log('OUR GREAT PARAM', params)
    const fetchProducts = () =>
        backendFetch({
            endpoint: `/product/${params}`,
            // endpoint: `/product/${params}`,
            // token: token
        });

    return useQuery({
        queryKey: ["FETCH_TOPSELLING_PRODUCT_LIST", params],
        queryFn: () => fetchProducts(),
        ...{
            staleTime: Infinity,
            ...options
        }
    });
};

export const useGetSingleProducts = ({productId}) => {
    // const token = getCookie(USER_TOKEN);
    console.log('OUR GREAT PARAM', productId)
    const fetchProducts = () =>
        backendFetch({
            endpoint: `/product/${productId}`,
            // token: token
        });

    return useQuery({
        queryKey: ["FETCH_PRODUCT_DETAIL", productId],
        queryFn: () => fetchProducts(),
        ...{
            staleTime: Infinity,
            enabled: !!productId,
        }
    });
};

export const useFetchCartProducts = (cartItems) => {
    const fetchProducts = async () => {
      const fetchedProducts = await Promise.all(
        cartItems.map((item) =>
          backendFetch({ endpoint: `/product/${item.product_id}` }).then(
            (product) => ({
              ...product,
              quantity: item.quantity,
            })
          )
        )
      );
      return fetchedProducts;
    };

    return useQuery({
      queryKey: ["cartProducts", cartItems],
      queryFn: fetchProducts,
      enabled: cartItems.length > 0, // Only fetch when cartItems is populated
      staleTime: Infinity,
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
