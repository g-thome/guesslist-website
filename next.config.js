module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
  redirects() {
    return [
      {
        source: "/",
        destination: "/my-lists",
        permanent: true,
      },
    ];
  },
};
