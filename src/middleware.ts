import withAuth from "next-auth/middleware";


export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        if (token?.role === "admin") {
          return true;
        } else {
          console.log("NOT ADMIN", token);

         return false;
        }
      } else {
        return true;
      }
    },
  },
});

export const config = {
  matcher: ["/admin(/.*)?"],
};
