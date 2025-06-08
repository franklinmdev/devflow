import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="text-dark100_light900 h1-bold">All Users</h1>

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
        <Skeleton className="flex-1 h-14" />
        <Skeleton className="w-28 h-14" />
      </div>

      <div className="flex flex-wrap gap-5 mt-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="rounded-2xl w-full xs:w-[230px] h-60"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
