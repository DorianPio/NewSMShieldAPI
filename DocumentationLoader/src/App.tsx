import APIDocumentation from "./components/ApiDocumentation";

const App = () => {
  return (
    <APIDocumentation
      apiBaseUrl={"http://localhost:3000/api"}
      docFolder={"/documentation"}
    />
  );
};

export default App;
