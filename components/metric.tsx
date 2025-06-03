import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title?: string;
  textStyles?: string;
  isAuthor?: boolean;
  href?: string;
  imgStyles?: string;
  titleStyles?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  isAuthor,
  href,
  imgStyles,
  titleStyles,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={cn("rounded-full object-contain", imgStyles)}
      />
      <p className={cn(textStyles, "flex items-center gap-1")}>{value}</p>
      {title ? (
        <span className={cn("small-regular line-clamp-1", titleStyles)}>
          {title}
        </span>
      ) : null}
    </>
  );

  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
