(function(){
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  if(!file) return;
  const contentContainer = document.getElementById('message-content');
  const titleContainer = document.getElementById('message-title');
  const markdownPath = '../messages/' + file;
  fetch(markdownPath)
    .then(res => res.text())
    .then(md => {
      contentContainer.innerHTML = marked.parse(md);
      const firstLine = md.split('\n').find(l => l.trim().startsWith('#'));
      if(firstLine){
        titleContainer.textContent = firstLine.replace(/^#+\s*/, '');
      } else {
        titleContainer.textContent = file.replace('.md','');
      }
    })
    .catch(err => {
      contentContainer.innerHTML = '<p>Could not load message.</p>';
      console.error(err);
    });
})();
