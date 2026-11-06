export const siteConfig = {
  name: "Okagua Kenoye",
  shortName: "Kenoye",
  canonicalOrigin: "https://www.kenoye.site",
  apexOrigin: "https://kenoye.site",
  title: "Okagua Kenoye | Software Architect & Product Engineer",
  titleTemplate: "%s | Okagua Kenoye",
  description:
    "Explore the portfolio of Okagua Kenoye, a software architect and product engineer building scalable web applications, mobile apps, and modern digital platforms.",
  email: "okagua.kenny@gmail.com",
  location: "Nigeria",
  /**
   * Set to true when actively open to new opportunities.
   * Controls the availability badge in the hero and contact sections.
   */
  openToWork: true,
  availabilityNote: "Open to full-time and consulting opportunities",
  workPreference: "Remote",
  social: {
    github: "https://github.com/kenoyek",
    linkedin: "https://www.linkedin.com/in/okagua/",
    resume: "https://drive.google.com/drive/folders/18QK8VnGCzIs0w01PqOqxK0rtuXB0PCK2?usp=sharing",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.canonicalOrigin).toString();
