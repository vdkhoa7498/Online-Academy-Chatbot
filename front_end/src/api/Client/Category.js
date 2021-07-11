export function CategoryHttpService(options) {
    function getCategories(query) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.get(baseUrl, query);
    }
  
    function createCategory(form) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.post(baseUrl, form);
    }

    function getCategoryById(id) {
      const baseUrl = options.httpService.getUrl(`categories/${id}`);
      return options.httpService.get(baseUrl);
    }

    return {
        getCategories,
        createCategory,
        getCategoryById,
    };
}