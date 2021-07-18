export function CategoryHttpService(options) {
    async function getCategories(query) {
      const baseUrl = options.httpService.getUrl("categories");
      return await options.httpService.get(baseUrl, query);
    }

    async function getCategoriesAdmin(query) {
      const baseUrl = options.httpService.getUrl('admin/categories');
      return await options.httpService.get(baseUrl, query);
    }
  
    async function createCategory(form) {
      const baseUrl = options.httpService.getUrl("categories");
      return await options.httpService.post(baseUrl, form);
    }

    async function getCategoryById(id) {
      const baseUrl = options.httpService.getUrl(`categories/${id}`);
      return await options.httpService.get(baseUrl);
    }

    async function editCategory(form) {
      const baseUrl = options.httpService.getUrl("categories");
      return await options.httpService.put(baseUrl, form);
    }

    async function deleteCategory(categoryId) {
      const baseUrl = options.httpService.getUrl(`categories/${categoryId}`);
      return await options.httpService.del(baseUrl);
    }

    return {
        getCategories,
        getCategoriesAdmin,
        createCategory,
        getCategoryById,
        editCategory,
        deleteCategory
    };
}