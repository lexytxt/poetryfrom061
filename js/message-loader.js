(function(){
    const contentContainer = document.getElementById('message-content');
    const titleElement = document.getElementById('message-title');
    if(!contentContainer || !titleElement) return;

    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');
    if(!file) {
        contentContainer.innerHTML = '<p>No message specified.</p>';
        return;
    }

    const markdownPath = '../messages/' + file;

    fetch(markdownPath)
        .then(response => response.text())
        .then(md => {
            contentContainer.innerHTML = marked.parse(md);
            const firstLine = md.split('\n').find(line => line.trim().length > 0);
            titleElement.textContent = firstLine.replace(/^#\s+/,'');
        })
        .catch(err => {
            contentContainer.innerHTML = '<p>Could not load message.</p>';
            console.error(err);
        });
})();
