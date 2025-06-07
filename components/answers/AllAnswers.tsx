import { AnswerFilters } from "@/constants/filters";
import { EMPTY_ANSWERS } from "@/constants/states";

import AnswerCard from "../cards/AnswerCard";
import DataRenderer from "../DataRenderer";
import CommonFilter from "../filters/CommonFilter";
import Pagination from "../Pagination";

interface Props extends ActionResponse<Answer[]> {
  totalAnswers: number;
  page: number;
  isNext: boolean;
}

const AllAnswers = ({
  data,
  success,
  error,
  totalAnswers,
  page,
  isNext,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex justify-between items-center">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "answer" : "answers"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32 w-full"
        />
      </div>
      <DataRenderer
        data={data}
        success={success}
        error={error}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />
      <Pagination page={page} isNext={isNext} />
    </div>
  );
};

export default AllAnswers;
