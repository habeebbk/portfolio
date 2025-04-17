const toggle=document.getElementById("darkToggle");
const root=document.documentElement;
const stored=localStorage.getItem("portfolio-theme");
if(stored)root.setAttribute("data-theme",stored);
toggle.addEventListener("click",()=>{const c=root.getAttribute("data-theme")==="dark"?"light":"dark";root.setAttribute("data-theme",c);localStorage.setItem("portfolio-theme",c);});

async function loadRepos(){
  const username="habeebbk";  // <-- change to your GitHub username
  const repoGrid=document.getElementById("repoGrid");
  try{
    const res=await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    const data=await res.json();
    data.forEach(repo=>{
      const card=document.createElement("article");
      card.className="card";
      card.innerHTML=`
        <h3>${repo.name}</h3>
        <p>${repo.description ?? "No description provided."}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
      `;
      repoGrid.appendChild(card);
    });
  }catch(err){
    repoGrid.innerHTML="<p>Could not load repos right now. 🙁</p>";
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded",loadRepos);