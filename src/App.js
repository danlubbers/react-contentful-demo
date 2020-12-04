import { useState, useEffect } from "react";
import "./App.css";

const query = `{
  titleCollection {
    items {
      title
      logo {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }
  }
}`;

function App() {
  const graphqlURL = `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`;
  const ContentfulAPI = process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_API;

  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(graphqlURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ContentfulAPI}`,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then(({ data, errors }) => {
        console.log(data);
        setPage(data.titleCollection.items[0]);
        if (errors) console.error(errors);
      });
  }, []);

  if (!page) return "Loading...";

  return (
    <div className="App">
      <header className="App-header">
        <img src={page.logo.url} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://contentful.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {page.title}
        </a>
      </header>
    </div>
  );
}

export default App;
