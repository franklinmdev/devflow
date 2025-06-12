interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  downvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & {
  success: true;
};

type ErrorResponse = ActionResponse & {
  success: false;
};

type APIErrorResponse = NextResponse<ErrorResponse>;

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string }>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface Answer {
  _id: string;
  author: Author;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  question: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
}

interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface Job {
  job_id: string;
  job_title: string;
  employer_logo: string;
  employer_name: string;
  job_location: string;
  job_country: string;
  job_apply_link: string;
  job_employment_type_text: string;
  job_min_salary: string;
  job_max_salary: string;
  job_description: string;
  job_highlights: {
    Qualifications: string[];
  };
  job_posted_at_datetime_utc: string;
}

interface GlobalSearchParams {
  query: string;
  type?: "question" | "user" | "answer" | "tag";
}

interface GlobalSearchResult {
  title: string;
  type: "question" | "user" | "answer" | "tag";
  id: string;
}
