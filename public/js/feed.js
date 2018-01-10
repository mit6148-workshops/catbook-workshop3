function storyDOMObject(storyJSON, user) {
  const card = document.createElement('div');
  card.setAttribute('id', storyJSON._id);
  card.className = 'story card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const creatorSpan = document.createElement('a');
  creatorSpan.className = 'story-creator card-title';
  creatorSpan.innerHTML = storyJSON.creator_name;
  creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.creator_id);
  cardBody.appendChild(creatorSpan);

  const contentSpan = document.createElement('p');
  contentSpan.className = 'story-content card-text';
  contentSpan.innerHTML = storyJSON.content;
  cardBody.appendChild(contentSpan);

  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  card.appendChild(cardFooter);

  const commentsDiv = document.createElement('div');
  commentsDiv.setAttribute('id', storyJSON._id + '-comments');
  commentsDiv.className = 'story-comments';
  cardFooter.appendChild(commentsDiv);

  return card;
}

function commentDOMObject(commentJSON) {
  commentDiv = document.createElement('div');
  commentDiv.setAttribute('id', commentJSON._id);
  commentDiv.className = 'comment mb-2';

  commentCreatorSpan = document.createElement('a');
  commentCreatorSpan.className = 'comment-creator';
  commentCreatorSpan.innerHTML = commentJSON.creator_name;
  commentCreatorSpan.setAttribute('href', '/u/profile?' + commentJSON.creator_id);
  commentDiv.appendChild(commentCreatorSpan);

  commentContentSpan = document.createElement('span');
  commentContentSpan.className = 'comment-content';
  commentContentSpan.innerHTML = ' | ' + commentJSON.content;
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}

function newCommentDOMObject(parent) {
  const newCommentDiv = document.createElement('div');
  newCommentDiv.className = 'comment input-group';

  const newCommentContent = document.createElement('input');
  newCommentContent.setAttribute('type', 'text');
  newCommentContent.setAttribute('name', 'content');
  newCommentContent.setAttribute('placeholder', 'New Comment');
  newCommentContent.setAttribute('id', parent + '-comment-input');
  newCommentContent.className = 'form-control';
  newCommentDiv.appendChild(newCommentContent);

  // here: create an input for commenting
  const newCommentParent = document.createElement('input');
  newCommentParent.setAttribute('type', 'hidden');
  newCommentParent.setAttribute('name', 'parent');
  newCommentParent.setAttribute('value', parent);
  newCommentDiv.appendChild(newCommentParent);

  const newCommentButtonDiv = document.createElement('div');
  newCommentButtonDiv.className = 'input-group-append';
  newCommentDiv.appendChild(newCommentButtonDiv);

  const newCommentSubmit = document.createElement('button');
  newCommentSubmit.innerHTML = 'Submit';
  newCommentSubmit.className = 'btn btn-outline-primary';
  newCommentSubmit.setAttribute('story-id', parent);
  // here: event handler for when we post comments
  // this happens when we click on the submit button
  newCommentSubmit.addEventListener('click', submitCommentHandler);
  newCommentButtonDiv.appendChild(newCommentSubmit);

  return newCommentDiv;
}

function submitCommentHandler() {
  // TO BE IMPLEMENTED:
  // make a POST request to our newly implemented db and store that comment
}

function newStoryDOMObject() {
  const newStoryDiv = document.createElement('div');
  newStoryDiv.className = 'input-group my-3';

  // input for creating a new story
  const newStoryContent = document.createElement('input');
  newStoryContent.setAttribute('type', 'text');
  newStoryContent.setAttribute('placeholder', 'New Story');
  newStoryContent.className = 'form-control';
  newStoryContent.setAttribute('id', 'story-content-input')
  newStoryDiv.appendChild(newStoryContent);

  const newStoryButtonDiv = document.createElement('div');
  newStoryButtonDiv.className = 'input-group-append';
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement('button');
  newStorySubmit.innerHTML = 'Submit';
  newStorySubmit.className = 'btn btn-outline-primary';
  // here: handler for when we submit the story
  newStorySubmit.addEventListener('click', submitStoryHandler);
  newStoryButtonDiv.appendChild(newStorySubmit);

  return newStoryDiv;
}

function submitStoryHandler() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
}

function renderStories(user) {
  document.getElementById('new-story').appendChild(newStoryDOMObject());

  const storiesDiv = document.getElementById('stories');
  get('/api/stories', {}, function(storiesArr) {
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.prepend(storyDOMObject(currentStory, user));

      get('/api/comment', { 'parent': currentStory._id }, function(commentsArr) {
        for (let j = 0; j < commentsArr.length; j++) {
          const currentComment = commentsArr[j];
          const commentDiv = document.getElementById(currentComment.parent + '-comments');
          commentDiv.appendChild(commentDOMObject(currentComment));
        }
      });
    }
  });
}
