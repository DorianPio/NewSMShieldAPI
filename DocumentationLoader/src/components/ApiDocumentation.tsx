import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Routes,
} from "react-router-dom";
import CategoryPage from "./Categorie";

export type APIMethod = "get" | "post" | "patch" | "put" | "delete";

export interface Parameter {
  key: string;
  getter: string;
}

export interface APIEndpoint {
  category: string;
  name: string;
  description: string;
  path: string;
  request: APIMethod;
  parameters: Parameter[];
}

export interface APIDocumentationProps {
  apiBaseUrl: string;
  docFolder: string;
}

const APIDocumentation: React.FC<APIDocumentationProps> = ({
  apiBaseUrl,
  docFolder,
}) => {
  // Your previous state variables and useEffects
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(
    null
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<{
    data: object | null;
    status: number | null;
  }>({ data: null, status: null });

  const [authToken, setAuthToken] = useState("");
  const [expandedEndpoint, setExpandedEndpoint] = useState<APIEndpoint | null>(
    null
  );
  const [filter, setFilter] = useState<{
    method: APIMethod | "";
    name: string;
  }>({ method: "", name: "" });

  // Your previous functions
  useEffect(() => {
    const fetchDocumentation = async () => {
      const files = await axios.get(`${docFolder}/index.json`);
      const fetchedEndpoints: APIEndpoint[] = [];
      // const filesPath: string[] = [];

      for (const file of files.data) {
        console.log("file: ", file);
        const response = await axios.get(`${docFolder}/${file}`);

        fetchedEndpoints.push(...response.data);
        // filesPath.push(file);
      }
      // console.log(filesPath);
      // setFiles(filesPath);
      setEndpoints(fetchedEndpoints);
    };

    fetchDocumentation();
  }, [docFolder]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(endpoints.map((endpoint) => endpoint.category))
    );
    setCategories(uniqueCategories);
    localStorage.setItem("category", JSON.stringify(uniqueCategories));
  }, [endpoints]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedEndpoint(null);
  };

  const handleEndpointSelect = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
  };

  const getRequestColor = (request: APIMethod): string => {
    switch (request) {
      case "get":
        return "bg-green-400";
      case "post":
        return "bg-blue-400";
      case "patch":
        return "bg-yellow-400";
      case "put":
        return "bg-orange-400";
      case "delete":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleParamChange = (key: string, value: string) => {
    setParamValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const executeRequest = async () => {
    try {
      const url = new URL(`${apiBaseUrl}${expandedEndpoint!.path}`);
      const paramsInQuery = Object.fromEntries(
        Object.entries(paramValues).filter(
          ([key]) =>
            expandedEndpoint!.parameters.find((p) => p.key === key)?.getter ===
            "query"
        )
      );
      url.search = new URLSearchParams(paramsInQuery).toString();

      const dataInBody = Object.fromEntries(
        Object.entries(paramValues).filter(
          ([key]) =>
            expandedEndpoint!.parameters.find((p) => p.key === key)?.getter ===
            "body"
        )
      );

      const response = await axios({
        method: expandedEndpoint!.request,
        url: url.toString(),
        data: dataInBody,
        headers: {
          Authorization: authToken ? authToken : undefined,
        },
      });

      setResponse({ data: response.data, status: response.status });
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setResponse({
          data: error.response.data,
          status: error.response.status,
        });
      }
    }
  };

  const handleEndpointToggle = (endpoint: APIEndpoint) => {
    if (expandedEndpoint === endpoint) {
      setExpandedEndpoint(null);
    } else {
      setExpandedEndpoint(endpoint);
      setResponse({ data: null, status: null });
    }
  };

  const filteredEndpoints = endpoints
    .filter((endpoint) => endpoint.category === selectedCategory)
    .filter((endpoint) =>
      filter.method ? endpoint.request === filter.method : true
    )
    .filter((endpoint) =>
      filter.name
        ? endpoint.name.toLowerCase().includes(filter.name.toLowerCase())
        : true
    );

  return (
    // <div>lol</div>
    <Router>
      <div>
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <nav className="bg-gray-800 p-4 mb-8 rounded">
          <ul className="flex space-x-4">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/category/${category}`}
                  className="text-white hover:text-blue-300"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/category/:categoryName"
            element={<CategoryPage apiBaseUrl={apiBaseUrl} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default APIDocumentation;
