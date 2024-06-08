import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
export default function Post({_id,title,summary,image,content,createdAt,author, slug}) {

  return (
    <div className="post">
      <div className="image">
        <Link to={slug}>
          <img src={image} alt={""}/>
        </Link>
      </div>
      <div className="flex flex-col gap-2 border-2 border-[#51B73B] border-double rounded-lg p-4">
        <Link to={`http://localhost:3000/${slug}`}>
        <h2 className="text-[26px] capitalize font-[500] hover:underline">{title}</h2>
        </Link>
        <p className="flex gap-2">
          <a className="author text-lime-800 font-semibold" href="#">Author: {author?.username}</a>
          <time className=" text-lime-500">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
        <Link to={slug} className="text-[18px] text-[#51B73B]">Read More</Link>
      </div>
    </div>
  );
}