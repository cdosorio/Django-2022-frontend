let baseUrl = 'http://127.0.0.1:8000'
let projectsUrl = baseUrl + '/api/projects/'

let getProjects = () => {
    fetch(projectsUrl)
    .then(response => response.json())
    .then(data => {        
        buildProjects(data)
    })
}

let buildProjects = (projects) => {
    let projectsWrapper = document.getElementById('projects--wrapper')

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        console.log(project)

        let projectCard =  `
            <div class="project--card">
                <img src="${baseUrl}/${project.featured_image}">
                <div>
                    <div class="card--header">
                        <h3>${project.title}</h3>      
                        <strong class="vote--option">&#43; </strong>
                        <strong class="vote--option">&#8722; </strong>
                    </div>                
                </div>
                
                <i>${project.vote_ratio}% Positive feedback </i>
                <i>${project.description.substring(0,150)} </i>

            </div>
        `
        projectsWrapper.innerHTML += projectCard
    }
}

getProjects()