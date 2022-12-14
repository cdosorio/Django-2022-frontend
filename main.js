//  ------------------  Login ------------------
let loginBtn = document.getElementById('login-btn');
let logoutBtn = document.getElementById('logout-btn');
let token = localStorage.getItem('token')

if (token){
  loginBtn.remove()
}else{
  logoutBtn.remove()
}

logoutBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  localStorage.removeItem('token')
  window.location = 'http://127.0.0.1:5500/login.html';
})




//  ------------------  List projects ------------------
let baseUrl = "http://127.0.0.1:8000";
let projectsUrl = baseUrl + "/api/projects/";

let getProjects = () => {
  fetch(projectsUrl)
    .then((response) => response.json())
    .then((data) => {
      buildProjects(data);
    });
};

let buildProjects = (projects) => {
  let projectsWrapper = document.getElementById("projects--wrapper");
  projectsWrapper.innerHTML == ''

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    let projectCard = `
            <div class="project--card">
                <img src="${baseUrl}/${project.featured_image}">
                <div>
                    <div class="card--header">
                        <h3>${project.title}</h3>
                        <strong class="vote--option" data-vote="up" data-project="${
                          project.id
                        }">&#43; </strong>
                        <strong class="vote--option" data-vote="down" data-project="${
                          project.id
                        }">&#8722; </strong>
                    </div>
                </div>

                <i>${project.vote_ratio}% Positive feedback </i>
                <i>${project.description.substring(0, 150)} </i>

            </div>
        `;
    projectsWrapper.innerHTML += projectCard;
  }

  // Add a event listener
  addVoteEvents();
};

let addVoteEvents = () => {
  let voteBtns = document.getElementsByClassName("vote--option");

  for (let i = 0; i < voteBtns.length; i++) {
    const btn = voteBtns[i];
    btn.addEventListener("click", (e) => {
      let token = localStorage.getItem('token')
      let vote = e.target.dataset.vote;
      let project = e.target.dataset.project;
      console.log("PROJECT: ", project, ". VOTE: ", vote);

      // Sending POST to API
      const url = `${projectsUrl}${project}/vote/`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: vote }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success: ", data);
        });
    });
  }
};

getProjects();
