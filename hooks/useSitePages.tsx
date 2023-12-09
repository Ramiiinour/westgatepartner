import { useAuth } from "../features/auth/contexts/AuthProvider";
import { urls } from "../data/custom-data/urls";

export function useSitePages() {
  const { isAdmin, isAgent } = useAuth();
  const homePageUrl = isAdmin
    ? urls.admin.pages.homepage
    : urls.agent.pages.homepage;

  return { homePageUrl };
}
