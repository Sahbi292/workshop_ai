function search() {
  const query = document.getElementById('searchInput').value;
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  fetchJsonp(url)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = "";

      data.data.slice(0, 10).forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.className = "track";
        trackDiv.innerHTML = `
          <img src="${track.album.cover_medium}" alt="${track.title}" />
          <h4>${track.title}</h4>
          <p>${track.artist.name}</p>
          <audio controls src="${track.preview}"></audio>
        `;
        resultsDiv.appendChild(trackDiv);
      });
    })
    .catch(error => {
      console.error("Erreur:", error);
    });
}
