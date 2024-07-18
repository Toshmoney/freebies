import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
export default function Post({_id,title,summary,image,content,createdAt,author, slug}) {

  return (
    <div className="post bg-white gap-4 md:p-10 p-4 flex flex-col justify-center rounded-br-[20%] max-sm:w-[100%]">
      <div className="flex flex-col gap-2 p-2">
        <Link to={`/${slug}`}>
        <h2 className="text-[26px] capitalize font-[500] hover:underline">{title}</h2>
        </Link>
        <p className="flex gap-2">
          <a className="author text-lime-800 font-semibold" href={`/author/${author?._id}`}>by @{author?.username || "Anonymous"}</a>
          <time className=" text-lime-500">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary text-gray-500">{summary}</p>
        <Link to={slug} className="text-green-500 font-medium cursor-pointer">Read More</Link>
      </div>
    </div>
  );
}