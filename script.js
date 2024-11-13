//     <script>
const themeButtons = document.querySelectorAll('.theme-switcher button');
const body = document.body;
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        body.style.backgroundColor = button.style.backgroundColor;
    });
});

const shareBtn = document.querySelector('.share-btn');
const postGrid = document.querySelector('.post-grid');
const emojiBtn = document.querySelector('.emoji-btn');
const emojiPicker = document.querySelector('.emoji-picker');
const textarea = document.querySelector('textarea');
const imageUploadBtn = document.querySelector('.image-upload-btn');
const imageUploadInput = document.querySelector('.image-upload-input');

emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
});

emojiPicker.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        textarea.value += e.target.textContent;
    }
});

imageUploadBtn.addEventListener('click', () => {
    imageUploadInput.click();
});

shareBtn.addEventListener('click', () => {
    const postContent = textarea.value;
    const imageFile = imageUploadInput.files[0];
    if (postContent.trim() === '' && !imageFile) return;

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <div class="user-info">
            <img src="assets/profile-icon-male.jpg" alt="User profile picture" width="40" height="40">
            <div class="name">John Doe</div>
            <div class="time">Just now</div>
        </div>
        <div class="content">${postContent}</div>
        <div class="actions">
            <div class="left">
                <button><i class="fas fa-heart"></i> Like</button>
                <button><i class="fas fa-comment"></i> Comment</button>
                <button><i class="fas fa-share"></i> Share</button>
            </div>
            <div class="right">
                <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded image';
            post.querySelector('.content').appendChild(img);
        };
        reader.readAsDataURL(imageFile);
    }
    postGrid.appendChild(post);
    textarea.value = '';
    imageUploadInput.value = '';

    const editBtn = post.querySelector('.edit-btn');
    const deleteBtn = post.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        const newContent = prompt('Edit your post:', post.querySelector('.content').textContent);
        if (newContent !== null) {
            post.querySelector('.content').textContent = newContent;
        }
    });

    deleteBtn.addEventListener('click', () => {
        post.remove();
    });
});
