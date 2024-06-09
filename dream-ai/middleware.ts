import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isPublic = createRouteMatcher([
  '/(.*)', '/new-user(.*)', '/sign-in(.*)', 
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) auth().protect();
}, { debug: true });

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};