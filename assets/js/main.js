document.addEventListener('DOMContentLoaded', function() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    displayPosts(posts);

    document.querySelector('.create-post button').addEventListener('click', function() {
        const textarea = document.querySelector('.create-post textarea');
        const postContent = textarea.value;
        const fileInput = document.querySelector('#file-input');
        const file = fileInput.files[0];

        if (postContent.trim() === '') {
            alert('Please write something before posting.');
            return;
        }

        const newPost = {
            author: "Alan Walker",
            content: postContent,
            image: file ? URL.createObjectURL(file) : null,
            comments: [],
            likes: 0,
            hasLiked: false 
        };

        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(posts);

        textarea.value = '';
        fileInput.value = '';
    });

    function displayPosts(posts) {
        const postsWrapper = document.querySelector('.posts-wrapper');
        postsWrapper.innerHTML = '';

        posts.forEach((post, index) => {
            const newPost = document.createElement('div');
            newPost.classList.add('post');
            newPost.innerHTML = `
                <div class="post-header">
                    <img alt="Profile picture of the post author" src="https://placehold.co/50x50"/>
                    <div class="post-author">${post.author}</div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.image ? `<img alt="Uploaded image" src="${post.image}"/>` : ''}
                </div>
                <div class="post-actions">
                    <div class="like-container">
                        <i class="fas fa-thumbs-up like-icon"></i>
                        <span class="like-count">${post.likes}</span>
                    </div>
                    <i class="fas fa-comment comment-icon"></i>
                    <i class="fas fa-share"></i>
                </div>
                <div class="comments-section" style="display: none;">
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

            postsWrapper.appendChild(newPost);

            newPost.querySelector('.like-icon').addEventListener('click', function() {
                if (!post.hasLiked) {
                    post.likes += 1;
                    post.hasLiked = true;
                    this.classList.add('liked'); 
                } else {
                    post.likes -= 1;
                    post.hasLiked = false;
                    this.classList.remove('liked'); 
                }
                newPost.querySelector('.like-count').innerText = post.likes;
                localStorage.setItem('posts', JSON.stringify(posts));
            });

            newPost.querySelector('.comment-icon').addEventListener('click', function() {
                const commentsSection = this.closest('.post').querySelector('.comments-section');
                const isVisible = commentsSection.style.display === 'block';

                commentsSection.style.display = isVisible ? 'none' : 'block';
                
                if (isVisible) {
                    this.classList.remove('commented');
                } else {
                    this.classList.add('commented'); 
                }
            });

            newPost.querySelector('.add-comment button').addEventListener('click', function() {
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
        });
    }
});