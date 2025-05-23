interface Author {
  id: string;
  name: string;
  image: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Question {
  id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}
