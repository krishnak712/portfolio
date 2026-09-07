import apiClient from "./apiClient";

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const getSkills = async () => {
  const response = await apiClient.get("/skills");
  return response.data;
};

export const getProjects = async () => {
  const response = await apiClient.get("/projects");
  return response.data;
};

export const getExperience = async () => {
  const response = await apiClient.get("/experience");
  return response.data;
};

export const getAchievements = async () => {
  const response = await apiClient.get("/achievements");
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}`);
  return response.data;
};