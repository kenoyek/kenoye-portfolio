export const getOptimizedImageUrl = (url: string, width = 1200) => {
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }

  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`);
};
