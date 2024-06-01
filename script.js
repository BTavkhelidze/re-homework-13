//! darkMode LIght Mode logic

const dayNightBtn = document.querySelector('.dayNight');

const dayNightNam = document.querySelector('.dayNightNam');

const dayNightIcon = document.querySelector('.dayNightIcon');

dayNightBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark--mode');
  if (document.body.classList.contains('dark--mode')) {
    dayNightNam.textContent = 'LIGHT';
    dayNightIcon.src = './images/light.svg';
    dayNightIcon.alt = 'day icon';
  } else {
    dayNightNam.textContent = 'DARK';
    dayNightIcon.src = './images/night.png';
    dayNightIcon.alt = 'night icon';
  }
});

// !fetch api

const searchBtn = document.querySelector('.searchBtn');
const input = document.querySelector('.input');

const avatarUrl = document.querySelector('.avatarUrl');

const bio = document.querySelector('.bio');
const repos = document.querySelector('.repos');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const dataNum = document.querySelector('.dataNum');

const userLocation = document.querySelector('.location');

const githubBlog = document.querySelector('.githubBlog');

const twitter = document.querySelector('.twitter');

const company = document.querySelector('.company');

const profileName = document.querySelector('.profileName');
const profileEmail = document.querySelector('.profileEmail');

const output__wrapper = document.querySelector('.output__wrapper');
const noResult = document.querySelector('.noResult');

async function getGithubApi(input) {
  try {
    const response = await fetch(`https://api.github.com/users/${input}`);
    const data = await response.json();

    output__wrapper.style.display = 'block';
    noResult.style.display = 'none';

    bio.textContent = data.bio;
    avatarUrl.src = data.avatar_url;
    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.repos_url.length;
    const apiResponseDate = data.created_at;
    console.log(data);

    profileName.textContent = data.name;

    profileEmail.textContent = !data.email ? '' : data.email;

    const date1 = new Date(apiResponseDate);
    const year = date1.getFullYear();
    const month = String(date1.getMonth() + 1).padStart(2, '0');

    dataNum.textContent = `Joined  ${month} ${year}`;

    userLocation.textContent = !data.location ? 'Not Available' : data.location;

    if (data.blog == '') {
      githubBlog.textContent = 'Not Available';
    } else {
      githubBlog.textContent = data.gists_url;
      githubBlog.href = data.gists_url;
    }

    if (!data.twitter_username) {
      twitter.textContent = 'Not Available';
    } else {
      twitter.textContent = data.twitter_username;
      twitter.href = data.twitter_username;
    }
    if (data.company === '') {
      company.textContent = 'Not Available';
    } else {
      company.textContent = data.company;
      company.href = data.organizations_url;
    }
  } catch (eror) {
    output__wrapper.style.display = 'none';
    noResult.style.display = 'inline-block';
  }
}

searchBtn.addEventListener('click', () => {
  getGithubApi(input.value.trim());
});
