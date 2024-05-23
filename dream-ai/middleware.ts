import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isPublic = createRouteMatcher([
  '/', '/new-user(.*)', '/sign-in(.*)', 
]);

export default clerkMiddleware((auth, req) => {
  console.log('Request URL:', req.url);
  console.log('Is Public:', isPublic(req));
  
  if (!isPublic(req)) {
    console.log('Request is protected. Authenticating...');
    auth().protect();
  }
}, { debug: true});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
