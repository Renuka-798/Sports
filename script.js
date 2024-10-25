document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const commentText = document.getElementById('commentInput').value;
  if (commentText.trim()) {
    addComment(commentText);
    document.getElementById('commentInput').value = '';
  }
});

function addComment(text) {
  const commentSection = document.getElementById('comments');

  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  const commentText = document.createElement('p');
  commentText.textContent = text;

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const likeButton = createActionButton('Like', handleLike);
  const shareButton = createActionButton('Share', handleShare);
  const subscribeButton = createActionButton('Subscribe', handleSubscribe);

  actionsDiv.appendChild(likeButton);
  actionsDiv.appendChild(shareButton);
  actionsDiv.appendChild(subscribeButton);

  commentDiv.appendChild(commentText);
  commentDiv.appendChild(actionsDiv);

  commentSection.appendChild(commentDiv);
}

function createActionButton(label, callback) {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', callback);
  return button;
}

function handleLike() {
  alert('You liked the comment!');
}

function handleShare() {
  alert('Comment shared!');
}

function handleSubscribe() {
  alert('Subscribed to the comment!');
}
