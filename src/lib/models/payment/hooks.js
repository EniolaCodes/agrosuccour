import { backendFetch } from "@/lib/core/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMutateInitiatePayment = (options) => {

    const initiatePayment = (data) =>
      backendFetch({
        endpoint: '/payment/create/',
        method: 'POST',
        body: data,
    });

    return useMutation({
      mutationFn: initiatePayment,
      ...options,
    });
};

export const useMutateVerifyPayment = (options) => {

    const verifyPayment = (data) =>
      backendFetch({
        endpoint: '/payment/verify/',
        method: 'POST',
        body: data,
    });

    return useMutation({
      mutationFn: verifyPayment,
      ...options,
    });
};
