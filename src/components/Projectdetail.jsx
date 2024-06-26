import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function Projectdetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  console.log("ID from URL params:", id); // Yahaan console mein ID print karo

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("Project ID is undefined");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`/api/v1/project/getoneproject/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }
        const projectData = await response.json();
        setProject(projectData.project);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    console.log("Effect is running");
    fetchProject();
  }, [id]); // Ensure that 'id' is included in the dependency array
  
  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!project) {
    return <p>No project details found</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <p className="text-gray-700 mb-4">Description: {project.description}</p>
      <p className="text-gray-700 mb-4"><a href={`${project.projectLink}`}>ProjectLink </a> </p> 

      {/* Render more details as needed */}
    </div>
  );
}

export default Projectdetail;
