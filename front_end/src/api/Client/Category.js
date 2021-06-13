export function CategoryHttpService(options) {
    function getCategories(query) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.get(baseUrl, query);
    }
  
    function createCategory(form) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.post(baseUrl, form);
    }
    return {
        getCategories,
        createCategory,
    };
}