export const siteConfig = {
  name: "Okagua Kenoye",
  shortName: "Kenoye",
  canonicalOrigin: "https://www.kenoye.site",
  apexOrigin: "https://kenoye.site",
  title: "Okagua Kenoye - Software Architect and Product Engineer",
  titleTemplate: "%s | Okagua Kenoye",
  description:
    "Okagua Kenoye designs and ships full-stack, mobile, and product systems across health technology, education technology, CMS-driven platforms, and technical consulting.",
  email: "okagua.kenny@gmail.com",
  location: "Nigeria",
  social: {
    github: "https://github.com/kenoyek",
    linkedin: "https://www.linkedin.com/in/okagua/",
    resume: "https://drive.google.com/drive/folders/18QK8VnGCzIs0w01PqOqxK0rtuXB0PCK2?usp=sharing",
  },
} as const;

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.canonicalOrigin).toString();

