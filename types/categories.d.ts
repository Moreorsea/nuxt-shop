
interface ICategory {
  id: number;
  slug: string;
  title: string;
}

interface ICategories {
  categories: ICategory[];
}
