// ... (définitions de types et d'interfaces)

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateRandomKey } from "../gen";
import { APIEndpoint, APIMethod } from "./ApiDocumentation";

// ... (définitions de types et d'interfaces)

const CategoryPage: React.FC<{ apiBaseUrl: string }> = ({ apiBaseUrl }) => {
  const { categoryName } = useParams<{ categoryName: string }>();

  // Les états
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(
    null
  );
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

  // Les fonctions et useEffect
  // ... (les fonctions et useEffect du composant APIDocumentation)

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
    setParamValues((prevValues: any) => ({ ...prevValues, [key]: value }));
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

  useEffect(() => {
    const category = JSON.parse(String(localStorage.getItem("category")));

    const index = category.indexOf(categoryName);
    const fileName: string =
      index === 0 ? "data.json" : "data_" + index.toString() + ".json";
    const fetchDocumentation = async () => {
      const response = await axios.get(`/documentation/${fileName}`);
      setEndpoints(
        response.data.filter(
          (endpoint: APIEndpoint) => endpoint.category === categoryName
        )
      );
    };

    fetchDocumentation();
  }, [categoryName]);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
      <div className="flex justify-between">
        <div className="flex-1">
          <label htmlFor="authToken" className="font-semibold">
            authToken :
          </label>
          <input
            id="authToken"
            type="text"
            className="border rounded px-2 py-1"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <select
            className="border rounded px-2 py-1"
            value={filter.method}
            onChange={(e) =>
              setFilter((prev: any) => ({ ...prev, method: e.target.value }))
            }
          >
            <option value="">All methods</option>
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="patch">PATCH</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
          </select>
          <input
            type="text"
            placeholder="Filter by name"
            className="border rounded px-2 py-1"
            value={filter.name}
            onChange={(e) =>
              setFilter((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="mt-4">
        {endpoints
          .filter((endpoint) =>
            filter.method ? endpoint.request === filter.method : true
          )
          .filter((endpoint) =>
            filter.name
              ? endpoint.name.toLowerCase().includes(filter.name.toLowerCase())
              : true
          )
          .map((endpoint, index) => (
            <div key={index}>
              <button
                className={`block w-full text-left p-4 mb-2 rounded ${getRequestColor(
                  endpoint.request
                )}`}
                onClick={() => handleEndpointToggle(endpoint)}
              >
                <div className="font-bold">{endpoint.name}</div>
                <div>{endpoint.description}</div>
              </button>
              {expandedEndpoint === endpoint && (
                <div className="bg-gray-100 p-4 mb-2 rounded">
                  <div className="mt-4 space-y-2">
                    {endpoint.parameters.map((parameter, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <label
                          htmlFor={parameter.key}
                          className="font-semibold"
                        >
                          {parameter.key} ({parameter.getter}):
                        </label>
                        <input
                          id={parameter.key}
                          type="text"
                          placeholder={parameter.key}
                          className="border rounded px-2 py-1"
                          value={paramValues[parameter.key] || ""}
                          onChange={(e) =>
                            handleParamChange(parameter.key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button
                      className={`py-2 px-4 rounded ${getRequestColor(
                        endpoint.request
                      )}`}
                      onClick={executeRequest}
                    >
                      Exécuter
                    </button>
                  </div>
                  {response.status !== null && (
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold">Réponse</h3>
                      <div className="bg-gray-200 p-4 rounded">
                        <div className="font-semibold mb-2">
                          Code de réponse: {response.status}
                        </div>
                      </div>
                      <div>
                        <pre className="bg-gray-300 p-4 rounded overflow-x-auto">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
