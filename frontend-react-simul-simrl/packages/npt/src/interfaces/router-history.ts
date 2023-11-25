import { getQueryParams } from "../utils/utils";

export default interface IRouterHistory {
  navigateToPath: (config: {
    path?: string[];
    queryParams?: { [key: string]: string | number | undefined } | null;
    state?: any;
    replace?: boolean;
  }) => void;
  routeLocation: any;
  routeParams: any;
  navigateBack: () => void;
  navigateToEntry: (entry: number) => void;
  getRoutePath: (...path: string[]) => string;
  matchPathName: (...path: string[]) => boolean;
  getQueryParams: typeof getQueryParams;
}
