const usernameInput = document.getElementById('username');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      if (username) {
        searchUser(username);
      }
    });

    function searchUser(username) {
      const searchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(username)}`;

      fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          if (data.items.length > 0) {
            const userId = data.items[0].id;
            return getUserRepos(userId);
          } else {
            throw new Error('User not found');
          }
        })
        .then(repos => displayRepos(repos))
        .catch(error => console.error(error));
    }

    function getUserRepos(userId) {
      const reposUrl = `https://api.github.com/users/${userId}/repos`;
      return fetch(reposUrl)
        .then(response => response.json())
        .then(data => data.filter(repo => !repo.fork));
    }

    function displayRepos(repos) {
      const repoList = document.getElementById('repo-list');
      repoList.innerHTML = '';

      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        repoList.appendChild(repoItem);
      });
    }