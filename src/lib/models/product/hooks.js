import { backendFetch } from "@/lib/core/client";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({ options, params }) => {
  // const token = getCookie(USER_TOKEN);
  console.log("OUR GREAT PARAM", params);
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
      ...options,
    },
  });
};

export const useGetTopSellingProducts = ({ options, params }) => {
  // const token = getCookie(USER_TOKEN);
  console.log("OUR GREAT PARAM", params);
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
      ...options,
    },
  });
};

export const useGetSingleProducts = ({ productId }) => {
  // const token = getCookie(USER_TOKEN);
  console.log("OUR GREAT PARAM", productId);
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
    },
  });
};

// export const useFetchCartProducts = (cartItems) => {
//   const fetchProducts = async () => {
//     const fetchedProducts = await Promise.all(
//       cartItems.map((item) =>
//         backendFetch({ endpoint: `/product/${item.product_id}` }).then(
//           (product) => ({
//             ...product,
//             quantity: item.quantity,
//           })
//         )
//       )
//     );
//     return fetchedProducts;
//   };

//   return useQuery({
//     queryKey: ["cartProducts", cartItems],
//     queryFn: fetchProducts,
//     enabled: cartItems.length > 0,
//     staleTime: Infinity,
//   });
// };

export const useFetchCartProducts = (cartItems) => {
  const [enabled, setEnabled] = useState(false); // Add an enabled state

  useEffect(() => {
    setEnabled(true); // Enable the query on the client-side
  }, []);

  const fetchProducts = async () => {
    if (!cartItems || cartItems.length === 0) {
      return []; // Return an empty array if cartItems is empty
    }

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
    enabled: enabled,
    staleTime: Infinity,
  });
};

//   fetch all distinct logistics locations
export const useFetchLogistics = ({ options } = {}) => {
  console.log("location options", options);
  const fetchLogistics = () =>
    backendFetch({ endpoint: "/logistic/?distinct=true" });

  return useQuery({
    queryKey: ["FETCH_LOGISTICS"],
    queryFn: fetchLogistics,
    staleTime: Infinity,
    ...options,
  });
};
//  fetch logistics based on selected location
export const useFetchLogisticsByLocation = ({ from, options } = {}) => {
  const fetchLogistics = () =>
    backendFetch({ endpoint: `/logistic/?from=${from}` });

  return useQuery({
    queryKey: ["FETCH_LOGISTICS_BY_LOCATION", from],
    queryFn: fetchLogistics,
    enabled: !!from,
    staleTime: Infinity,
    ...options,
  });
};

// fetch logistics price based on selected locations
export const useFetchLogisticsPrice = ({ from, to, options } = {}) => {
  const fetchLogisticsPrice = () =>
    backendFetch({ endpoint: `/logistic/?from=${from}&to=${to}` });

  return useQuery({
    queryKey: ["FETCH_LOGISTICS_PRICE", from, to],
    queryFn: fetchLogisticsPrice,
    enabled: !!from && !!to,
    staleTime: Infinity,
    ...options,
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
