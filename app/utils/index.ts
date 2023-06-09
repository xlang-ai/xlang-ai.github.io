export const publicFilePath = (path: string) => {
  // For deployment to github pages
  if (process.env.NODE_ENV === "production") {
    return `/xlang-website${path}`;
  } else {
    return path;
  }
};
