import { Link } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import ArrowRight from "./ArrowRight";
import fetchPost from "../modules/Home-page-modules/fetch_posts";

function Home() {
  const { isLoading, error, data } = fetchPost();

  console.log(data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="row p-5">
        {data &&
          data.map((post) => (
            <div key={post.id} className="col-md-4 mt-5">
              <div className="card custom-card" style={{ border: "none" }}>
                <div className="card-body">
                  <h2 className="card-title">{post.title.rendered}</h2>
                  <p className="card-text">{formatDate(post.date)}</p>
                  <div
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  ></div>
                  <div className="link">
                    <Link to={"/" + post.slug} className="card-link">
                      Read More
                    </Link>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
