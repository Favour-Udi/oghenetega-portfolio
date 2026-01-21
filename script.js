
// Dark mode toggle with localStorage
const root = document.documentElement;
const toggleBtn = document.getElementById('toggle-theme');
const pref = localStorage.getItem('theme');
if(pref === 'light') root.classList.add('light');

toggleBtn?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Load projects.json and render cards
fetch('projects.json')
  .then(r => r.json())
  .then(items => {
    const list = document.getElementById('project-list');
    list.innerHTML = '';
    items.forEach(p => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3><a href="${p.url}" target="_blank" rel="noopener">${p.name}</a></h3>
        <p>${p.summary || ''}</p>
        <ul class="tags">${(p.tags||[]).map(t=>`<li class="tag">${t}</li>`).join('')}</ul>
      `;
      list.appendChild(el);
    });
  })
  .catch(() => {
    document.getElementById('project-list').innerHTML = '<p class="muted">Could not load projects.</p>';
  });
