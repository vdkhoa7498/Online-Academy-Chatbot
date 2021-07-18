export function CategoryHttpService(options) {
    function getCategories(query) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.get(baseUrl, query);
    }

    function getCategoriesAdmin(query) {
      const baseUrl = options.httpService.getUrl('admin/categories');
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

    function editCategory(form) {
      const baseUrl = options.httpService.getUrl("categories");
      return options.httpService.put(baseUrl, form);
    }

    return {
        getCategories,
        getCategoriesAdmin,
        createCategory,
        getCategoryById,
        editCategory
    };
}