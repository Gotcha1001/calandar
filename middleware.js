import { clerkMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
export default clerkMiddleware({
  beforeAuth: (req) => {
    // Execute code before authentication
  },
  afterAuth: (auth, req) => {
    const isPublicRoute = req.url.includes("/"); // Add more public routes as needed

    // Handle users who aren't authenticated
    if (!auth.userId && !isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url);
      return Response.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
