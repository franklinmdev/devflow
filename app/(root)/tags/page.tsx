import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.actions";

export default async function Tags({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page || 1),
    pageSize: Number(pageSize || 10),
    query,
    filter,
  });

  const { tags } = data || {};

  return (
    <>
      <h1 className="text-dark100_light900 text-3xl h1-bold">Tags</h1>
      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAGS}
          placeholder="Search tags..."
          iconPosition="left"
          otherClasses="flex-1"
        />
        <DataRenderer
          success={success}
          error={error}
          data={tags}
          empty={EMPTY_TAGS}
          render={(tags) => (
            <div className="flex flex-wrap sm:justify-center gap-4 mt-10 w-full">
              {tags.map((tag) => (
                <TagCard key={tag._id} {...tag} />
              ))}
            </div>
          )}
        />
      </section>
    </>
  );
}
