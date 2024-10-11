document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsSection = document.getElementById('posts');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        // 发布帖子
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
            loadPosts();
        }
    });

    // 加载帖子列表
    async function loadPosts() {
        const response = await fetch('/api/posts');
        const posts = await response.json();

        postsSection.innerHTML = '<h2>帖子列表</h2>';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="post-actions">
                    <button class="like-btn">👍 点赞 (${post.likes})</button>
                    <button class="comment-btn">💬 评论</button>
                </div>
            `;
            postsSection.appendChild(postElement);
        });
    }

    loadPosts();
});
