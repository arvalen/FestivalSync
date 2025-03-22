document.addEventListener('DOMContentLoaded', function() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    displayPosts(posts);

    function displayPosts(posts) {
        const mainContent = document.querySelector('.main-content');
        const postsContainer = document.createElement('div');
        mainContent.appendChild(postsContainer);

        posts.forEach((post, index) => {
            if (post.author === "Alan Walker") {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-header">
                        <img alt="Profile picture of the post author" src="https://placehold.co/50x50"/>
                        <div class="post-author">${post.author}</div>
                    </div>
                    <div class="edit-delete-icons">
                        <i class="fas fa-edit edit-icon"></i>
                        <i class="fas fa-trash-alt delete-icon"></i>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                        ${post.image ? `<img alt="Post image" src="${post.image}"/>` : ''}
                    </div>
                    <div class="post-actions">
                        <div class="like-container">
                            <i class="fas fa-thumbs-up like-icon ${post.hasLiked ? 'liked' : ''}"></i>
                            <span class="like-count">${post.likes}</span>
                        </div>
                        <i class="fas fa-comment comment-icon ${post.comments.length > 0 ? 'commented' : ''}"></i>
                        <i class="fas fa-share"></i>
                    </div>
                    <div class="comments-section" style="display: ${post.comments.length > 0 ? 'block' : 'none'};">
                        ${post.comments.map(comment => `
                            <div class="comment">
                                <img alt="Profile picture of the commenter" src="https://placehold.co/30x30"/>
                                <div class="comment-text">${comment}</div>
                            </div>
                        `).join('')}
                        <div class="add-comment">
                            <input placeholder="Write a comment..." type="text"/>
                            <button><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postElement);

                postElement.querySelector('.like-icon').addEventListener('click', function() {
                    post.hasLiked = !post.hasLiked;
                    post.likes += post.hasLiked ? 1 : -1;
                    this.classList.toggle('liked', post.hasLiked);
                    postElement.querySelector('.like-count').innerText = post.likes;
                    localStorage.setItem('posts', JSON.stringify(posts));
                });

                postElement.querySelector('.comment-icon').addEventListener('click', function() {
                    const commentsSection = this.closest('.post').querySelector('.comments-section');
                    const isVisible = commentsSection.style.display === 'block';
                    commentsSection.style.display = isVisible ? 'none' : 'block';
                    this.classList.toggle('commented', !isVisible);
                });

                postElement.querySelector('.add-comment button').addEventListener('click', function() {
                    const commentInput = this.previousElementSibling;
                    const commentText = commentInput.value;

                    if (commentText.trim() === '') {
                        alert('Please write a comment before sending.');
                        return;
                    }

                    post.comments.push(commentText);
                    localStorage.setItem('posts', JSON.stringify(posts));

                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.innerHTML = `
                        <img alt="Profile picture of the commenter" src="https://placehold.co/30x30"/>
                        <div class="comment-text">${commentText}</div>
                    `;

                    this.closest('.comments-section').insertBefore(newComment, this.closest('.add-comment'));
                    commentInput.value = '';
                });

                postElement.querySelector('.edit-icon').addEventListener('click', function() {
                    const postContent = postElement.querySelector('.post-content p');
                    const textarea = document.createElement('textarea');
                    textarea.value = postContent.innerText;
                    postContent.innerHTML = '';
                    postContent.appendChild(textarea);

                    const saveButton = document.createElement('button');
                    saveButton.innerText = 'Save';
                    saveButton.style.marginTop = '10px';
                    postContent.appendChild(saveButton);

                    saveButton.addEventListener('click', function() {
                        post.content = textarea.value;
                        postContent.innerHTML = `<p>${textarea.value}</p>`;
                        localStorage.setItem('posts', JSON.stringify(posts));
                    });
                });

                postElement.querySelector('.delete-icon').addEventListener('click', function() {
                    posts.splice(index, 1);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    postElement.remove();
                });
            }
        });
    }
});