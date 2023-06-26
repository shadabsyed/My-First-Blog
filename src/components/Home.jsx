import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatDate } from "../modules/formatDate";

function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () =>
      fetch("http://site1.local/wp-json/wp/v2/posts/").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="row">
        {data &&
          data.map((post) => (
            <div key={post.id} className="col-md-4">
              <div className="card mt-4">
                <div className="card-body">
                  <h2 className="card-title">{post.title.rendered}</h2>
                  <p className="card-text">{formatDate(post.date)}</p>
                  <div
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  ></div>
                  <Link to={"/" + post.slug}>Read More</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
