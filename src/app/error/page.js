"use client";
import Link from "next/link";

const ErrorPage = ({ statusCode, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-Grey100">
      <h1 className="text-6xl font-bold text-Red500 mb-4">Oops!</h1>
      <h2 className="text-3xl text-Grey500 mb-2">An error occurred.</h2>
      {statusCode && (
        <p className="text-lg text-Grey400 mb-4">Status Code: {statusCode}</p>
      )}
      {message && <p className="text-lg text-Grey400 mb-4">{message}</p>}
      <Link
        href="/"
        className="text-Green500 hover:text-Green800 font-semibold"
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
