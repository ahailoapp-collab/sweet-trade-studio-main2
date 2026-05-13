import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Return to Home
        </a>
        <p className="mt-3 text-xs text-muted-foreground" aria-label="Requested path">{location.pathname}</p>
      </div>
    </div>
  );
};

export default NotFound;
