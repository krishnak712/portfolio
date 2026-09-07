export const env = {
  apiBaseUrl: (
    import.meta.env.VITE_API_BASE_URL ||
    "https://portfolio-gyfl.onrender.com/api"
  ).replace(/\/$/, ""),

  githubUsername:
    import.meta.env.VITE_GITHUB_USERNAME || "krishak712",
};