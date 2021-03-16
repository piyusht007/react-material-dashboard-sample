const Projects = () => {
  fetch('/postal-transaction-generator-ws/getProjects')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      return data;
    }).catch(console.log);
};

export default Projects;
