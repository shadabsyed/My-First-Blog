function Headers() {
  fetch(
    "https://hostplover.com/stest/wp-json/wp/v2/posts?page=2&per_page=8"
  ).then((res) => {
    console.log(res.headers);
  });
}

Headers();

fetch(
  "https://hostplover.com/stest/wp-json/wp/v2/posts?page=2&per_page=8"
).then((res) => {
  console.log(res.headers);
});
